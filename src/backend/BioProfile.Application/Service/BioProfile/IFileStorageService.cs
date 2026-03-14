namespace BioProfile.Application.BioProfiles;

public interface IFileStorageService
{
    Task<string> UploadFileAsync(Stream fileStream, string fileName, CancellationToken cancellationToken);
}