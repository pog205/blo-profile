using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace BioProfile.Infrastructure.Data.Interceptors;

/// <summary>
/// Interceptor that automatically sets auditable fields (CreatedAt, UpdatedAt, CreatedBy, UpdatedBy)
/// when entities are added or modified.
/// </summary>
public class AuditableEntityInterceptor : SaveChangesInterceptor
{
    private readonly ICurrentUserService? _currentUserService;
    private readonly TimeProvider _timeProvider;

    public AuditableEntityInterceptor(
        ICurrentUserService? currentUserService = null,
        TimeProvider? timeProvider = null)
    {
        _currentUserService = currentUserService;
        _timeProvider = timeProvider ?? TimeProvider.System;
    }

    public override InterceptionResult<int> SavingChanges(
        DbContextEventData eventData,
        InterceptionResult<int> result)
    {
        UpdateAuditableEntities(eventData.Context);
        return base.SavingChanges(eventData, result);
    }

    public override ValueTask<InterceptionResult<int>> SavingChangesAsync(
        DbContextEventData eventData,
        InterceptionResult<int> result,
        CancellationToken cancellationToken = default)
    {
        UpdateAuditableEntities(eventData.Context);
        return base.SavingChangesAsync(eventData, result, cancellationToken);
    }

    private void UpdateAuditableEntities(DbContext? context)
    {
        if (context is null)
            return;

        var utcNow = _timeProvider.GetUtcNow().UtcDateTime;
        var currentUser = _currentUserService?.UserId;

        foreach (var entry in context.ChangeTracker.Entries())
        {
            if (entry.State == EntityState.Added)
            {
                SetPropertyIfExists(entry, "CreatedAt", utcNow);
                SetPropertyIfExists(entry, "CreatedBy", currentUser);
            }

            if (entry.State == EntityState.Modified)
            {
                SetPropertyIfExists(entry, "UpdatedAt", utcNow);
                SetPropertyIfExists(entry, "UpdatedBy", currentUser);
            }
        }
    }

    private static void SetPropertyIfExists(EntityEntry entry, string propertyName, object? value)
    {
        var property = entry.Properties.FirstOrDefault(p => p.Metadata.Name == propertyName);
        if (property != null && value != null)
        {
            property.CurrentValue = value;
        }
    }
}

/// <summary>
/// Service interface to get current user information.
/// Implement this interface in your application layer.
/// </summary>
public interface ICurrentUserService
{
    /// <summary>
    /// Gets the current user's ID.
    /// </summary>
    string? UserId { get; }

    /// <summary>
    /// Gets the current user's name.
    /// </summary>
    string? UserName { get; }
}
