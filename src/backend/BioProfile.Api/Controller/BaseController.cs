using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BioProfile.Api.Controller;

[Route("api/[controller]")]
[ApiController]
public abstract class BaseController(
    IMediator mediator,
    ILogger logger) : ControllerBase
{
    protected readonly IMediator mediator = mediator;
    protected readonly ILogger logger = logger;
}
