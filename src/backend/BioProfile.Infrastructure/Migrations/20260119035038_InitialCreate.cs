using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SystemDesign.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BioProfiles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Slug = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    EnglishName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Location = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    AvatarUrl = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    BackgroundUrl = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    FontFamily = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false, defaultValue: "Inter"),
                    AccentColor = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false, defaultValue: "#6366f1"),
                    TextColor = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false, defaultValue: "#1f2937"),
                    BackgroundColor = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false, defaultValue: "#ffffff"),
                    IconsColor = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false, defaultValue: "#4b5563"),
                    ProfileOpacity = table.Column<double>(type: "float", nullable: false, defaultValue: 0.94999999999999996),
                    ProfileBlur = table.Column<double>(type: "float", nullable: false, defaultValue: 10.5),
                    MouseEffect = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    BackgroundEffect = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    UserId = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Views = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedBy = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BioProfiles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Musics",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    MusicUrl = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Order = table.Column<int>(type: "int", nullable: false),
                    BioProfileId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedBy = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Musics", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Musics_BioProfiles_BioProfileId",
                        column: x => x.BioProfileId,
                        principalTable: "BioProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SocialLinks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Platform = table.Column<int>(type: "int", nullable: false),
                    Url = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Icon = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    BioProfileId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedBy = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SocialLinks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SocialLinks_BioProfiles_BioProfileId",
                        column: x => x.BioProfileId,
                        principalTable: "BioProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BioProfiles_CreatedAt",
                table: "BioProfiles",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_BioProfiles_Slug",
                table: "BioProfiles",
                column: "Slug",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_BioProfiles_UserId",
                table: "BioProfiles",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Musics_BioProfileId",
                table: "Musics",
                column: "BioProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_Musics_BioProfileId_Order",
                table: "Musics",
                columns: new[] { "BioProfileId", "Order" });

            migrationBuilder.CreateIndex(
                name: "IX_SocialLinks_BioProfileId",
                table: "SocialLinks",
                column: "BioProfileId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Musics");

            migrationBuilder.DropTable(
                name: "SocialLinks");

            migrationBuilder.DropTable(
                name: "BioProfiles");
        }
    }
}
