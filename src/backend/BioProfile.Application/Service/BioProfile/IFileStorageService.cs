namespace BioProfile.Application.BioProfiles;

public interface IFileStorageService
{
    Task<string> UploadFileAsync(IFormFile file, CancellationToken cancellationToken);
}