using BioProfile.Application.Common;
using BioProfile.Domain.Repositories;
using FluentValidation;

namespace BioProfile.Commands.BioProfile
{
    public class UpdateBioProfileCommand : ICommand<Result>
    {
        public UpdateBioProfileCommand(Guid id, string fieldName, string fieldValue)
        {
            Id = id;
            FieldName = fieldName;
            FieldValue = fieldValue;
        }

        public Guid Id { get; set; }
        public string FieldName  { get; set; }
        public string FieldValue { get; set; }
    }
    public class UpdateBioProfileCommandValidator : AbstractValidator<UpdateBioProfileCommand>
    {
        public UpdateBioProfileCommandValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage("Id is required.");
            RuleFor(x => x.FieldName).NotEmpty().WithMessage("Field name is required.");
            RuleFor(x => x.FieldValue).NotEmpty().WithMessage("Field value is required.");
        }
    }
    public class UpdateBioProfileCommandHandler : ICommandHandler<UpdateBioProfileCommand, Result>
    {
        private readonly IBioProfileRepository _bioProfileRepository ;

        public UpdateBioProfileCommandHandler(IBioProfileRepository bioProfileRepository)
        {
            _bioProfileRepository = bioProfileRepository;
        }

        public async Task<Result> Handle(UpdateBioProfileCommand request, CancellationToken cancellationToken)
        {
              var existBioProfile = await _bioProfileRepository.GetByIdAsync(request.Id, cancellationToken);
            if (existBioProfile == null){

                  return Result.Failure("BioProfile not found");
            }
            switch (request.FieldName.ToLower())
            {
                case "name":
                    existBioProfile.Name = request.FieldValue;
                    break;
                case "description":
                    existBioProfile.Description = request.FieldValue;
                    break;
                case "avatarurl":
                    existBioProfile.AvatarUrl = request.FieldValue;
                    break;
                case "slug":
                    existBioProfile.Slug = request.FieldValue;
                    break;
                case "mouseeffecturl":
                    existBioProfile.MouseEffectUrl = request.FieldValue;
                    break;
                case "backgroundurl":
                    existBioProfile.BackgroundUrl = request.FieldValue;
                    break;
                case "fontfamily":
                    existBioProfile.FontFamily = request.FieldValue;
                    break;
                case "accentcolor":
                    existBioProfile.AccentColor = request.FieldValue;
                    break;
                case "textcolor":
                    existBioProfile.TextColor = request.FieldValue;
                    break;
                case "backgroundcolor":      
                    existBioProfile.BackgroundColor = request.FieldValue;
                    break;
                case "iconscolor":
                    existBioProfile.IconsColor = request.FieldValue;
                    break;
                case "profileopacity":
                    if (double.TryParse(request.FieldValue, out double opacity))
                    {
                        existBioProfile.ProfileOpacity = opacity;
                    }
                    else
                    {
                        return Result.Failure("Invalid value for profile opacity");
                    }
                    break;
                case "profileblur":
                    if (double.TryParse(request.FieldValue, out double blur))
                    {
                        existBioProfile.ProfileBlur = blur;
                    }
                    else
                    {
                        return Result.Failure("Invalid value for profile blur");
                    }
                    break;
                case "backgroundeffect":
                    if (Guid.TryParse(request.FieldValue, out Guid effectId))
                    {
                        existBioProfile.BackgroundEffectId = effectId;
                    }
                    else
                    {
                        return Result.Failure("Invalid value for background effect");
                    }
                    break;
                default:
                    return Result.Failure("Invalid field name");
            }
           await _bioProfileRepository.UpdateAsync(existBioProfile, cancellationToken);
            return Result.Success();
        }
    }
}