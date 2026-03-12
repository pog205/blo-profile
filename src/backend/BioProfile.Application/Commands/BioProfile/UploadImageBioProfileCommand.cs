namespace BioProfile.Commands.BioProfile
{
    public class UploadImageBioProfileCommad:ICommand<string>
    {
        public IFormFile File { get; set; }
    }

    public class UploadImageBioProfileCommandHandler : ICommandHandler<UploadImageBioProfileCommad, string>
    {
        private readonly IFileStorageService _fileStorageService;
        public async Task<string> Handle(UploadImageBioProfileCommad request, CancellationToken cancellationToken)
        {
            var fileId = await _fileStorageService.UploadFileAsync(request.File, cancellationToken);
            return fileId;
        }
    }
}