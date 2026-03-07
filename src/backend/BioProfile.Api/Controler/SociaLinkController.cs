using BioProfile.Application.Queries.SocialLinkQueries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BioProfile.Api.Controler
{
    public class SociaLinkController : Controller
    {
        private readonly IMediator _mediator;

        public SociaLinkController(IMediator mediator)
        {
            _mediator = mediator;
        }

     
        [HttpGet]
        public async Task<IActionResult> GetAll() 
        {
            
            var result = await _mediator.Send(new GetSocialLinksQuery());

            return Ok(result);
        }
    }
}
