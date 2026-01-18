using Microsoft.AspNetCore.Mvc;
using BioProfile.Application.BioProfiles;
using BioProfile.Domain.Models;

namespace BioProfile.Api.Endpoints;

public static class BioProfileEndpoints
{
    public static IEndpointRouteBuilder MapBioProfileEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/bioprofiles")
            .WithTags("BioProfiles");

        group.MapGet("/{id:guid}", GetBioProfileById)
            .WithName("GetBioProfileById")
            .WithSummary("Get a BioProfile by ID");

        group.MapGet("/slug/{slug}", GetBioProfileBySlug)
            .WithName("GetBioProfileBySlug")
            .WithSummary("Get a BioProfile by slug");

        group.MapGet("/user/{userId}", GetBioProfilesByUserId)
            .WithName("GetBioProfilesByUserId")
            .WithSummary("Get all BioProfiles for a user");

        group.MapPost("/", CreateBioProfile)
            .WithName("CreateBioProfile")
            .WithSummary("Create a new BioProfile");

        group.MapPut("/{id:guid}", UpdateBioProfile)
            .WithName("UpdateBioProfile")
            .WithSummary("Update an existing BioProfile");

        group.MapDelete("/{id:guid}", DeleteBioProfile)
            .WithName("DeleteBioProfile")
            .WithSummary("Delete a BioProfile");

        group.MapPost("/{id:guid}/views", IncrementViews)
            .WithName("IncrementViews")
            .WithSummary("Increment view count for a BioProfile");

        return app;
    }

    private static async Task<IResult> GetBioProfileById(
        Guid id,
        IBioProfileService bioProfileService,
        CancellationToken cancellationToken)
    {
        var result = await bioProfileService.GetByIdAsync(id, cancellationToken);

        return result.Match(
            bioProfile => Results.Ok(bioProfile),
            error => Results.NotFound(new { error }));
    }

    private static async Task<IResult> GetBioProfileBySlug(
        string slug,
        IBioProfileService bioProfileService,
        CancellationToken cancellationToken)
    {
        var result = await bioProfileService.GetBySlugAsync(slug, cancellationToken);

        return result.Match(
            bioProfile => Results.Ok(bioProfile),
            error => Results.NotFound(new { error }));
    }

    private static async Task<IResult> GetBioProfilesByUserId(
        string userId,
        IBioProfileService bioProfileService,
        CancellationToken cancellationToken)
    {
        var result = await bioProfileService.GetByUserIdAsync(userId, cancellationToken);

        return result.Match(
            bioProfiles => Results.Ok(bioProfiles),
            error => Results.Problem(error));
    }

    private static async Task<IResult> CreateBioProfile(
        [FromBody] CreateBioProfileRequest request,
        IBioProfileService bioProfileService,
        CancellationToken cancellationToken)
    {
        // TODO: Get userId from authenticated user context
        var userId = "test-user-id"; // Temporary

        var result = await bioProfileService.CreateAsync(request, userId, cancellationToken);

        return result.Match(
            bioProfile => Results.Created($"/api/bioprofiles/{bioProfile.Id}", bioProfile),
            error => Results.BadRequest(new { error }));
    }

    private static async Task<IResult> UpdateBioProfile(
        Guid id,
        [FromBody] UpdateBioProfileRequest request,
        IBioProfileService bioProfileService,
        CancellationToken cancellationToken)
    {
        var result = await bioProfileService.UpdateAsync(id, request, cancellationToken);

        return result.Match(
            bioProfile => Results.Ok(bioProfile),
            error => Results.NotFound(new { error }));
    }

    private static async Task<IResult> DeleteBioProfile(
        Guid id,
        IBioProfileService bioProfileService,
        CancellationToken cancellationToken)
    {
        var result = await bioProfileService.DeleteAsync(id, cancellationToken);

        return result.Match(
            () => Results.NoContent(),
            error => Results.NotFound(new { error }));
    }

    private static async Task<IResult> IncrementViews(
        Guid id,
        IBioProfileService bioProfileService,
        CancellationToken cancellationToken)
    {
        var result = await bioProfileService.IncrementViewsAsync(id, cancellationToken);

        return result.Match(
            () => Results.Ok(),
            error => Results.Problem(error));
    }
}
