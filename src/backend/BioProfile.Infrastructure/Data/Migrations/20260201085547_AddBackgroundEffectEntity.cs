using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BioProfile.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddBackgroundEffectEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SocialLinks_BioProfiles_BioProfileId",
                table: "SocialLinks");

            migrationBuilder.DropIndex(
                name: "IX_SocialLinks_BioProfileId",
                table: "SocialLinks");

            migrationBuilder.DropColumn(
                name: "BioProfileId",
                table: "SocialLinks");

            migrationBuilder.DropColumn(
                name: "BackgroundEffect",
                table: "BioProfiles");

            migrationBuilder.DropColumn(
                name: "MouseEffect",
                table: "BioProfiles");

            migrationBuilder.AddColumn<Guid>(
                name: "BackgroundEffectId",
                table: "BioProfiles",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MouseEffectUrl",
                table: "BioProfiles",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.CreateTable(
                name: "BackgroundEffects",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ColorHex = table.Column<string>(type: "nvarchar(7)", maxLength: 7, nullable: false),
                    Shape = table.Column<int>(type: "int", nullable: false),
                    Opacity = table.Column<double>(type: "float(3)", precision: 3, scale: 2, nullable: false),
                    SizeMin = table.Column<double>(type: "float(5)", precision: 5, scale: 2, nullable: false),
                    SizeMax = table.Column<double>(type: "float(5)", precision: 5, scale: 2, nullable: false),
                    Preset = table.Column<int>(type: "int", nullable: false),
                    MoveSpeed = table.Column<double>(type: "float(5)", precision: 5, scale: 2, nullable: false),
                    ParticleCount = table.Column<int>(type: "int", nullable: false),
                    EnableLinks = table.Column<bool>(type: "bit", nullable: false),
                    EnableHoverEffect = table.Column<bool>(type: "bit", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BackgroundEffects", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BioProfileSocialLinks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BioProfileId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SocialLinkId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Order = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedBy = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BioProfileSocialLinks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BioProfileSocialLinks_BioProfiles_BioProfileId",
                        column: x => x.BioProfileId,
                        principalTable: "BioProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BioProfileSocialLinks_SocialLinks_SocialLinkId",
                        column: x => x.SocialLinkId,
                        principalTable: "SocialLinks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "BackgroundEffects",
                columns: new[] { "Id", "ColorHex", "CreatedAt", "CreatedBy", "EnableHoverEffect", "EnableLinks", "IsActive", "MoveSpeed", "Name", "Opacity", "ParticleCount", "Preset", "Shape", "SizeMax", "SizeMin", "UpdatedAt", "UpdatedBy" },
                values: new object[,]
                {
                    { new Guid("11111111-1111-1111-1111-111111111111"), "#00ff00", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "System", true, true, true, 2.5, "Gaming Network", 0.59999999999999998, 100, 1, 1, 4.0, 2.0, null, null },
                    { new Guid("22222222-2222-2222-2222-222222222222"), "#ffffff", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "System", false, false, true, 1.5, "Snow Falling", 0.80000000000000004, 150, 2, 1, 3.0, 1.0, null, null },
                    { new Guid("33333333-3333-3333-3333-333333333333"), "#ffff00", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "System", true, false, true, 1.0, "Fireflies", 0.69999999999999996, 80, 3, 3, 2.5, 1.5, null, null },
                    { new Guid("44444444-4444-4444-4444-444444444444"), "#ff6600", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "System", false, false, true, 3.0, "Fire & Smoke", 0.5, 120, 4, 1, 5.0, 2.0, null, null },
                    { new Guid("55555555-5555-5555-5555-555555555555"), "#00ff00", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "System", false, false, true, 4.0, "Matrix Code", 0.90000000000000002, 200, 2, 2, 2.0, 1.0, null, null }
                });

            migrationBuilder.InsertData(
                table: "SocialLinks",
                columns: new[] { "Id", "CreatedAt", "CreatedBy", "Icon", "Platform", "UpdatedAt", "UpdatedBy", "Url" },
                values: new object[,]
                {
                    { new Guid("77777777-7777-7777-7777-777777777777"), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "https://cdn.simpleicons.org/github", 9, null, null, "https://github.com" },
                    { new Guid("88888888-8888-8888-8888-888888888888"), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "https://cdn.simpleicons.org/x", 4, null, null, "https://x.com" },
                    { new Guid("99999999-9999-9999-9999-999999999999"), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "https://cdn.simpleicons.org/linkedin", 14, null, null, "https://linkedin.com" }
                });

            migrationBuilder.InsertData(
                table: "BioProfiles",
                columns: new[] { "Id", "AccentColor", "AvatarUrl", "BackgroundColor", "BackgroundEffectId", "BackgroundUrl", "CreatedAt", "CreatedBy", "Description", "EnglishName", "FontFamily", "IconsColor", "Location", "MouseEffectUrl", "Name", "ProfileBlur", "ProfileOpacity", "Slug", "TextColor", "UpdatedAt", "UpdatedBy", "UserId" },
                values: new object[,]
                {
                    { new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"), "#6366f1", "https://i.pravatar.cc/300", "#ffffff", new Guid("11111111-1111-1111-1111-111111111111"), "https://images.unsplash.com/photo-1579546929518-9e396f3cc809", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "System", "This is a demo bio profile with gaming theme", "Demo Profile", "Inter", "#4b5563", "Vietnam", null, "Demo User", 10.5, 0.94999999999999996, "demo-profile", "#1f2937", null, null, "demo-user-001" },
                    { new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"), "#3b82f6", "https://i.pravatar.cc/300?img=1", "#f8fafc", new Guid("22222222-2222-2222-2222-222222222222"), "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "System", "Chill winter aesthetic profile", "Winter Theme", "Inter", "#64748b", "Iceland", null, "Winter Vibe", 8.0, 0.90000000000000002, "winter-theme", "#1e293b", null, null, "winter-user-002" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_BioProfiles_BackgroundEffectId",
                table: "BioProfiles",
                column: "BackgroundEffectId");

            migrationBuilder.CreateIndex(
                name: "IX_BioProfileSocialLinks_BioProfileId",
                table: "BioProfileSocialLinks",
                column: "BioProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_BioProfileSocialLinks_BioProfileId_SocialLinkId",
                table: "BioProfileSocialLinks",
                columns: new[] { "BioProfileId", "SocialLinkId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_BioProfileSocialLinks_SocialLinkId",
                table: "BioProfileSocialLinks",
                column: "SocialLinkId");

            migrationBuilder.AddForeignKey(
                name: "FK_BioProfiles_BackgroundEffects_BackgroundEffectId",
                table: "BioProfiles",
                column: "BackgroundEffectId",
                principalTable: "BackgroundEffects",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BioProfiles_BackgroundEffects_BackgroundEffectId",
                table: "BioProfiles");

            migrationBuilder.DropTable(
                name: "BackgroundEffects");

            migrationBuilder.DropTable(
                name: "BioProfileSocialLinks");

            migrationBuilder.DropIndex(
                name: "IX_BioProfiles_BackgroundEffectId",
                table: "BioProfiles");

            migrationBuilder.DeleteData(
                table: "BioProfiles",
                keyColumn: "Id",
                keyValue: new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"));

            migrationBuilder.DeleteData(
                table: "BioProfiles",
                keyColumn: "Id",
                keyValue: new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"));

            migrationBuilder.DeleteData(
                table: "SocialLinks",
                keyColumn: "Id",
                keyValue: new Guid("77777777-7777-7777-7777-777777777777"));

            migrationBuilder.DeleteData(
                table: "SocialLinks",
                keyColumn: "Id",
                keyValue: new Guid("88888888-8888-8888-8888-888888888888"));

            migrationBuilder.DeleteData(
                table: "SocialLinks",
                keyColumn: "Id",
                keyValue: new Guid("99999999-9999-9999-9999-999999999999"));

            migrationBuilder.DropColumn(
                name: "BackgroundEffectId",
                table: "BioProfiles");

            migrationBuilder.DropColumn(
                name: "MouseEffectUrl",
                table: "BioProfiles");

            migrationBuilder.AddColumn<Guid>(
                name: "BioProfileId",
                table: "SocialLinks",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<int>(
                name: "BackgroundEffect",
                table: "BioProfiles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MouseEffect",
                table: "BioProfiles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_SocialLinks_BioProfileId",
                table: "SocialLinks",
                column: "BioProfileId");

            migrationBuilder.AddForeignKey(
                name: "FK_SocialLinks_BioProfiles_BioProfileId",
                table: "SocialLinks",
                column: "BioProfileId",
                principalTable: "BioProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
