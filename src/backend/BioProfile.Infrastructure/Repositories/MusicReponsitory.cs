using BioProfile.Domain.Entities;
using BioProfile.Domain.Repositories;
using BioProfile.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace BioProfile.Infrastructure.Repositories
{
    public class MusicReponsitory(ApplicationDbContext context):Repository<Music>(context), IMusicRepository
    {
        
    }
}
