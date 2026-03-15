using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Services;
using BioProfile.Application.BioProfiles;

namespace BioProfile.Infrastructure.Service;

public class FileStorageService : IFileStorageService
{
    private const string ServiceAccountKeyPath = "tokyo-country-473706-i9-90dc4701e97c.json";
    private const string FolderId = "1Pb36skx6Vx4JrgQalS3MRNlgHQvbr2HU";

    public async Task<string> UploadFileAsync(Stream fileStream, string fileName, CancellationToken cancellationToken)
    {
        GoogleCredential credential;
        using (var stream = new FileStream(ServiceAccountKeyPath, FileMode.Open, FileAccess.Read))
        {
            credential = GoogleCredential.FromStream(stream)
                                         .CreateScoped(DriveService.Scope.DriveFile);
        }

        // 2. Tạo kết nối với Google Drive API
        var driveService = new DriveService(new BaseClientService.Initializer()
        {
            HttpClientInitializer = credential,
            ApplicationName = "BioProfile API"
        });

        // 3. Chuẩn bị Metadata (Tên file, Thư mục chứa)
        var fileMetadata = new Google.Apis.Drive.v3.Data.File()
        {
            Name = fileName,
            Parents = new List<string> { FolderId }
        };

        // 4. Đọc luồng file và gọi API Upload
        var uploadRequest = driveService.Files.Create(fileMetadata, fileStream, "application/octet-stream");
        uploadRequest.Fields = "id";

        var response = await uploadRequest.UploadAsync(cancellationToken);

        if (response.Status == Google.Apis.Upload.UploadStatus.Failed)
        {
            throw new Exception($"Upload failed: {response.Exception.Message}");
        }

        return uploadRequest.ResponseBody.Id;
    }
    
}