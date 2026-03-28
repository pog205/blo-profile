using BioProfile.Application.Common;
using BioProfile.Application.BioProfiles;

namespace BioProfile.Commands.BioProfile
{
    public class UploadImageBioProfileCommad : ICommand<string>
    {
        public Stream FileStream { get; set; }
        public string FileName { get; set; }

        public UploadImageBioProfileCommad(Stream fileStream, string fileName)
        {
            FileStream = fileStream;
            FileName = fileName;
        }
    }

    public class UploadImageBioProfileCommandHandler : ICommandHandler<UploadImageBioProfileCommad, string>
    {
        private readonly IFileStorageService _fileStorageService;

        public UploadImageBioProfileCommandHandler(IFileStorageService fileStorageService)
        {
            _fileStorageService = fileStorageService;
        }
        public async Task<string> Handle(UploadImageBioProfileCommad request, CancellationToken cancellationToken)
        {
            var fileId = await _fileStorageService.UploadFileAsync(request.FileStream, request.FileName, cancellationToken);
            if (string.IsNullOrEmpty(fileId))
            {
                throw new Exception("Failed to upload file.");
            }
            
            return fileId;
        }
    }
}
