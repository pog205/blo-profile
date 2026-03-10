using MediatR;
using Microsoft.AspNetCore.Mvc;
using BioProfile.Domain.Repositories;

namespace BioProfile.Api.Controller;

public class MusicController(
    IMusicRepository musicRepository,
    IMediator mediator,
    ILogger<MusicController> logger) : BaseController(mediator, logger)
{
    private readonly IMusicRepository _musicRepository = musicRepository;

    // GET: api/Music
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _musicRepository.GetAllAsync());
    }
}
