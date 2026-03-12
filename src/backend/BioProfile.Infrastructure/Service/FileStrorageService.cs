
public class FileStorageService : IFileStorageService
{
    private const string ServiceAccountKeyPath = "tokyo-country-473706-i9-90dc4701e97c.json";
    private const string FolderId = "1Pb36skx6Vx4JrgQalS3MRNlgHQvbr2HU";

    public async Task<string> UploadFileAsync(IFormFile file, CancellationToken cancellationToken)
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
            Name = file.FileName,
            Parents = new List<string> { FolderId }
        };

        // 4. Đọc luồng file và gọi API Upload
        using var uploadStream = file.OpenReadStream();
        
        // Sửa lỗi biến: thay request.File thành file
        var uploadRequest = driveService.Files.Create(fileMetadata, uploadStream, file.ContentType);
        
        uploadRequest.Fields = "id"; 

        var response = await uploadRequest.UploadAsync(cancellationToken);

        if (response.Status == Google.Apis.Upload.UploadStatus.Failed)
        {
            throw new Exception($"Upload failed: {response.Exception.Message}");
        }

        var fileId = uploadRequest.ResponseBody.Id;

        // var directUrl = $"https://drive.google.com/uc?id={fileId}";
        
        return fileId;
    }
    
}