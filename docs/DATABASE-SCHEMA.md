# 🗂️ Sơ Đồ Cấu Trúc Dữ Liệu - BioProfile Project

## 📊 1. DATABASE SCHEMA (SQL Server)

### BioProfiles Table

```sql
┌─────────────────────────────────────────────────────────────┐
│                     BioProfiles Table                        │
├──────────────────┬───────────────────┬──────────────────────┤
│ Column           │ Type              │ Constraints          │
├──────────────────┼───────────────────┼──────────────────────┤
│ Id               │ uniqueidentifier  │ PK, NOT NULL         │
│ Slug             │ nvarchar(100)     │ UNIQUE, NOT NULL     │
│ Name             │ nvarchar(200)     │ NOT NULL             │
│ EnglishName      │ nvarchar(200)     │ NOT NULL             │
│ Location         │ nvarchar(200)     │ NULL                 │
│ Description      │ nvarchar(1000)    │ NULL                 │
│ AvatarUrl        │ nvarchar(500)     │ NOT NULL             │
│ BackgroundUrl    │ nvarchar(500)     │ NOT NULL             │
│ FontFamily       │ nvarchar(100)     │ DEFAULT 'Inter'      │
│ AccentColor      │ nvarchar(20)      │ DEFAULT '#6366f1'    │
│ TextColor        │ nvarchar(20)      │ DEFAULT '#1f2937'    │
│ BackgroundColor  │ nvarchar(20)      │ DEFAULT '#ffffff'    │
│ IconsColor       │ nvarchar(20)      │ DEFAULT '#4b5563'    │
│ ProfileOpacity   │ float             │ DEFAULT 0.95         │
│ ProfileBlur      │ float             │ DEFAULT 10.5         │
│ MouseEffect      │ int               │ DEFAULT 0            │
│ BackgroundEffect │ int               │ DEFAULT 0            │
│ UserId           │ nvarchar(256)     │ NOT NULL, INDEX      │
│ Views            │ int               │ DEFAULT 0            │
│ CreatedAt        │ datetime2         │ NOT NULL             │
│ UpdatedAt        │ datetime2         │ NULL                 │
│ CreatedBy        │ nvarchar(256)     │ NULL                 │
│ UpdatedBy        │ nvarchar(256)     │ NULL                 │
└──────────────────┴───────────────────┴──────────────────────┘
```

### Musics Table

```sql
┌───────────────────┬───────────────────┬──────────────────────┐
│ Column            │ Type              │ Constraints          │
├───────────────────┼───────────────────┼──────────────────────┤
│ Id                │ uniqueidentifier  │ PK, NOT NULL         │
│ Title             │ nvarchar(200)     │ NOT NULL             │
│ MusicUrl          │ nvarchar(500)     │ NOT NULL             │
│ Order             │ int               │ NOT NULL             │
│ BioProfileId      │ uniqueidentifier  │ FK, NOT NULL, INDEX  │
│ CreatedAt         │ datetime2         │ NOT NULL             │
│ UpdatedAt         │ datetime2         │ NULL                 │
│ CreatedBy         │ nvarchar(256)     │ NULL                 │
│ UpdatedBy         │ nvarchar(256)     │ NULL                 │
└───────────────────┴───────────────────┴──────────────────────┘
```

### SocialLinks Table

```sql
┌───────────────────┬───────────────────┬──────────────────────┐
│ Column            │ Type              │ Constraints          │
├───────────────────┼───────────────────┼──────────────────────┤
│ Id                │ uniqueidentifier  │ PK, NOT NULL         │
│ Platform          │ int               │ NOT NULL (enum)      │
│ Url               │ nvarchar(500)     │ NOT NULL             │
│ Icon              │ nvarchar(100)     │ NOT NULL             │
│ BioProfileId      │ uniqueidentifier  │ FK, NOT NULL, INDEX  │
│ CreatedAt         │ datetime2         │ NOT NULL             │
│ UpdatedAt         │ datetime2         │ NULL                 │
│ CreatedBy         │ nvarchar(256)     │ NULL                 │
│ UpdatedBy         │ nvarchar(256)     │ NULL                 │
└───────────────────┴───────────────────┴──────────────────────┘
```

### Relationships

```
BioProfiles (1) ──── (*) Musics
                │
                └─── (*) SocialLinks

- Cascade Delete: Xóa BioProfile → xóa tất cả Music & SocialLink
- Indexes: Slug (Unique), UserId, BioProfileId
```

---

## 🏗️ 2. BACKEND STRUCTURE (C# .NET)

### Domain Layer - Entities

```
BioProfile.Domain/Entities/
│
├── BaseEntity.cs
│   ├── Id (Guid)
│   ├── CreatedAt (DateTime)
│   ├── UpdatedAt (DateTime?)
│   ├── CreatedBy (string?)
│   └── UpdatedBy (string?)
│
├── User.cs (BioProfileEntity)
│   ├── Profile Settings
│   │   ├── Slug (string)
│   │   ├── Name (string)
│   │   ├── EnglishName (string)
│   │   ├── Location (string?)
│   │   ├── Description (string?)
│   │   ├── AvatarUrl (string)
│   │   └── BackgroundUrl (string)
│   │
│   ├── Theme Settings
│   │   ├── FontFamily (string)
│   │   ├── AccentColor (string)
│   │   ├── TextColor (string)
│   │   ├── BackgroundColor (string)
│   │   ├── IconsColor (string)
│   │   ├── ProfileOpacity (double)
│   │   └── ProfileBlur (double)
│   │
│   ├── Effects
│   │   ├── MouseEffect (int)
│   │   └── BackgroundEffect (int)
│   │
│   ├── Metadata
│   │   ├── UserId (string)
│   │   └── Views (int)
│   │
│   └── Navigation Properties
│       ├── ICollection<Music> Musics
│       └── ICollection<SocialLink> SocialLinks
│
├── Music.cs
│   ├── Id (Guid)
│   ├── Title (string)
│   ├── MusicUrl (string)
│   ├── Order (int)
│   ├── BioProfileId (Guid) [FK]
│   └── BioProfile (BioProfileEntity)
│
└── SocialLink.cs
    ├── Id (Guid)
    ├── Platform (SocialPlatform enum)
    ├── Url (string)
    ├── Icon (string)
    ├── BioProfileId (Guid) [FK]
    └── BioProfile (BioProfileEntity)
```

### Domain Layer - Models/DTOs

```
BioProfile.Domain/Models/
│
└── BioProfileModels.cs
    ├── ProfileSettings (record)
    │   └── slug, name, englishName, location, description, avatarUrl, backgroundUrl
    │
    ├── ColorScheme (record)
    │   └── accent, text, background, icons
    │
    ├── ThemeSettings (record)
    │   └── fontFamily, colors, profileOpacity, profileBlur
    │
    ├── MusicData (record)
    │   └── title, musicUrl, order
    │
    ├── SocialLinkData (record)
    │   └── platform, url, icon
    │
    ├── EffectSettings (record)
    │   └── mouseEffect, backgroundEffect
    │
    ├── TechnicalProps (record)
    │   └── theme, musics[], socialLinks[]
    │
    ├── SimulationProps (record)
    │   └── effects
    │
    ├── BioProfile (record)
    │   └── profile, technicalProps, simulationProps
    │
    ├── BioProfileData (record)
    │   └── id, userId, profile, theme, musics, socialLinks, effects, views, createdAt, updatedAt
    │
    ├── CreateBioProfileRequest (record)
    │   └── profile, theme, musics, socialLinks, effects
    │
    ├── UpdateBioProfileRequest (record)
    │   └── profile?, theme?, musics?, socialLinks?, effects?
    │
    └── BioProfileResponse (record)
        └── id, userId, profile, technicalProps, simulationProps, views, createdAt, updatedAt
```

### Application Layer

```
BioProfile.Application/
│
└── BioProfiles/
    ├── IBioProfileService.cs
    │   ├── GetByIdAsync(id)
    │   ├── GetBySlugAsync(slug)
    │   ├── GetByUserIdAsync(userId)
    │   ├── CreateAsync(request, userId)
    │   ├── UpdateAsync(id, request)
    │   ├── DeleteAsync(id)
    │   └── IncrementViewsAsync(id)
    │
    └── BioProfileService.cs
        └── Implementation + MapToResponse()
```

### Infrastructure Layer

```
BioProfile.Infrastructure/
│
├── Data/
│   ├── ApplicationDbContext.cs
│   │   ├── DbSet<BioProfileEntity> BioProfiles
│   │   ├── DbSet<Music> Musics
│   │   └── DbSet<SocialLink> SocialLinks
│   │
│   └── Configurations/
│       ├── BioProfileConfiguration.cs
│       ├── MusicConfiguration.cs
│       └── SocialLinkConfiguration.cs
│
└── Repositories/
    ├── IBioProfileRepository.cs
    │   ├── GetBySlugAsync(slug)
    │   ├── GetByIdWithDetailsAsync(id)
    │   ├── GetByUserIdAsync(userId)
    │   ├── SlugExistsAsync(slug)
    │   └── IncrementViewsAsync(id)
    │
    └── BioProfileRepository.cs
        └── Implementation với EF Core + Eager Loading
```

---

## 🔄 3. DATA FLOW (Backend → Frontend)

```
┌─────────────────────────────────────────────────────────────────┐
│                         DATA FLOW                                │
└─────────────────────────────────────────────────────────────────┘

DATABASE                 BACKEND                      FRONTEND
   │                        │                            │
   │  SQL Query             │                            │
   ├──────────────────────►│ Repository                 │
   │  BioProfileEntity +    │ ├── GetByIdWithDetailsAsync│
   │  Music[] +             │ └── Include(Musics)        │
   │  SocialLink[]          │     Include(SocialLinks)   │
   │                        │                            │
   │                        │ Service                    │
   │                        │ ├── GetByIdAsync()         │
   │                        │ └── MapToResponse()        │
   │                        │     │                      │
   │                        │     ▼                      │
   │                        │ BioProfileResponse         │
   │                        │ {                          │
   │                        │   Id,                      │
   │                        │   UserId,                  │
   │                        │   Profile {                │
   │                        │     Slug,                  │
   │                        │     Name,                  │
   │                        │     AvatarUrl, ...         │
   │                        │   },                       │
   │                        │   TechnicalProps {         │
   │                        │     Theme { ... },         │
   │                        │     Musics [ ... ],        │
   │                        │     SocialLinks [ ... ]    │
   │                        │   },                       │
   │                        │   SimulationProps {        │
   │                        │     Effects { ... }        │
   │                        │   },                       │
   │                        │   Views,                   │
   │                        │   CreatedAt                │
   │                        │ }                          │
   │                        │                            │
   │                        │ API Endpoint               │
   │                        │ GET /api/bioprofiles/:id   │
   │                        ├───────────────────────────►│
   │                        │        JSON Response       │
   │                        │                            │
   │                        │                            │ TypeScript
   │                        │                            │ Interface
   │                        │                            │ ▼
   │                        │                            │ BioProfileResponse
   │                        │                            │ {
   │                        │                            │   id: string,
   │                        │                            │   profile: {...},
   │                        │                            │   technicalProps: {
   │                        │                            │     theme,
   │                        │                            │     musics,
   │                        │                            │     socialLinks
   │                        │                            │   },
   │                        │                            │   simulationProps
   │                        │                            │ }
   │                        │                            │
   │                        │                            │ React Component
   │                        │                            │ <BioProfile
   │                        │                            │   data={response}
   │                        │                            │ />
```

---

## 🎨 4. FRONTEND TYPES (TypeScript)

```typescript
// bioprofile.types.ts

// Enums (sync với Backend)
export enum SocialPlatform {
  GitHub = "GitHub",
  LinkedIn = "LinkedIn",
  Twitter = "Twitter",
  Facebook = "Facebook",
  Instagram = "Instagram",
  YouTube = "YouTube",
  TikTok = "TikTok",
  Discord = "Discord",
  // ... 23 platforms total
}

export enum MouseEffectType {
  None = "None",
  Particles = "Particles",
  Trail = "Trail",
  Ripple = "Ripple",
}

export enum BackgroundEffectType {
  None = "None",
  Gradient = "Gradient",
  Animated = "Animated",
  Particles = "Particles",
}

// Profile Settings
export interface ProfileSettings {
  slug: string;
  name: string;
  englishName: string;
  location?: string;
  description?: string;
  avatarUrl: string;
  backgroundUrl: string;
}

// Theme Settings
export interface ColorScheme {
  accent: string;
  text: string;
  background: string;
  icons: string;
}

export interface ThemeSettings {
  fontFamily: string;
  colors: ColorScheme;
  profileOpacity: number;
  profileBlur: number;
}

// Music & Social
export interface MusicData {
  title: string;
  musicUrl: string;
  order: number;
}

export interface SocialLinkData {
  platform: SocialPlatform;
  url: string;
  icon: string;
}

// Effects
export interface EffectSettings {
  mouseEffect: MouseEffectType;
  backgroundEffect: BackgroundEffectType;
}

// Technical & Simulation Props
export interface TechnicalProps {
  theme: ThemeSettings;
  musics: MusicData[];
  socialLinks: SocialLinkData[];
}

export interface SimulationProps {
  effects: EffectSettings;
}

// Main Response Type
export interface BioProfileResponse {
  id: string;
  userId: string;
  profile: ProfileSettings;
  technicalProps: TechnicalProps;
  simulationProps: SimulationProps;
  views: number;
  createdAt: string;
  updatedAt: string;
}
```

---

## 🔌 5. API ENDPOINTS

```
GET    /api/bioprofiles/{id}           → BioProfileResponse
GET    /api/bioprofiles/slug/{slug}    → BioProfileResponse
GET    /api/bioprofiles/user/{userId}  → BioProfileResponse[]
POST   /api/bioprofiles                → BioProfileResponse
PUT    /api/bioprofiles/{id}           → BioProfileResponse
DELETE /api/bioprofiles/{id}           → 204 No Content
POST   /api/bioprofiles/{id}/views     → 200 OK
```

---

## 📦 6. EXAMPLE DATA FLOW

### Request: GET /api/bioprofiles/123

```
1. Frontend (React)
   └─► fetch('/api/bioprofiles/123')

2. API Controller (C#)
   └─► IBioProfileService.GetByIdAsync(id)

3. Service Layer
   └─► IBioProfileRepository.GetByIdWithDetailsAsync(id)

4. Repository
   └─► DbContext.BioProfiles
       .Include(b => b.Musics)
       .Include(b => b.SocialLinks)
       .FirstOrDefaultAsync(b => b.Id == id)

5. Database Query
   └─► SELECT * FROM BioProfiles WHERE Id = '123'
       SELECT * FROM Musics WHERE BioProfileId = '123'
       SELECT * FROM SocialLinks WHERE BioProfileId = '123'

6. Entity (in memory)
   └─► BioProfileEntity { Id, Slug, Name, ..., Musics[], SocialLinks[] }

7. Service.MapToResponse()
   └─► new BioProfileResponse(
         Id, UserId,
         new ProfileSettings(...),
         new TechnicalProps(
           new ThemeSettings(...),
           musics.Select(...),
           socialLinks.Select(...)
         ),
         new SimulationProps(...)
       )

8. JSON Response
   └─► {
         "id": "123",
         "profile": { "slug": "john-doe", ... },
         "technicalProps": { "theme": {...}, "musics": [...] },
         ...
       }

9. Frontend (TypeScript)
   └─► const data: BioProfileResponse = await response.json()
       setBioProfile(data)

10. React Component
    └─► <BioProfile
          slug={data.profile.slug}
          theme={data.technicalProps.theme}
          musics={data.technicalProps.musics}
        />
```

---

## 📝 7. MAPPING SUMMARY

| Layer            | Format          | Example                                         |
| ---------------- | --------------- | ----------------------------------------------- |
| **Database**     | SQL Tables      | `BioProfiles`, `Musics`, `SocialLinks`          |
| **Entity (ORM)** | C# Class        | `BioProfileEntity`, `Music`, `SocialLink`       |
| **DTO (API)**    | C# Record       | `BioProfileResponse`, `CreateBioProfileRequest` |
| **JSON (Wire)**  | JSON            | `{ "id": "123", "profile": {...} }`             |
| **Frontend**     | TypeScript      | `BioProfileResponse` interface                  |
| **UI**           | React Component | `<BioProfile data={...} />`                     |

---

## 🎯 KEY POINTS

✅ **Clean Architecture**: Domain → Application → Infrastructure → API
✅ **Separation of Concerns**: Entity ≠ DTO ≠ API Response
✅ **Type Safety**: C# Records & TypeScript Interfaces
✅ **Performance**: Eager Loading với Include()
✅ **Scalability**: Repository Pattern + Service Layer
✅ **Maintainability**: Clear data flow & mapping

---

**Last Updated**: January 18, 2026
**Project**: BioProfile - Bio-link Profile Platform
