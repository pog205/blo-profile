using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BioProfile.Domain.Repositories;

namespace BioProfile.Api.Controler
{
    public class MusicController(IMusicRepository musicRepository) : Controller
    {
        // GET: MusicController
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await musicRepository.GetAllAsync());
        }
    }
}
