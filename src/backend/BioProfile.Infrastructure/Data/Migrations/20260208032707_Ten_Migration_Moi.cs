using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BioProfile.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class Ten_Migration_Moi : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BioProfiles_BackgroundEffects_BackgroundEffectId",
                table: "BioProfiles");

            migrationBuilder.DropTable(
                name: "BioProfileSocialLinks");

            migrationBuilder.DropIndex(
                name: "IX_BioProfiles_UserId",
                table: "BioProfiles");

            migrationBuilder.DropColumn(
                name: "Url",
                table: "SocialLinks");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "BioProfiles");

            migrationBuilder.RenameColumn(
                name: "Order",
                table: "Musics",
                newName: "DisplayOrder");

            migrationBuilder.RenameIndex(
                name: "IX_Musics_BioProfileId_Order",
                table: "Musics",
                newName: "IX_Musics_BioProfileId_DisplayOrder");

            migrationBuilder.AddColumn<Guid>(
                name: "UserAccountId",
                table: "BioProfiles",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "UserAccounts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    RefreshToken = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    RefreshTokenExpiryTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedBy = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAccounts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserSocialLinks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BioProfileId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SocialLinkId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Url = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    DisplayOrder = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedBy = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSocialLinks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserSocialLinks_BioProfiles_BioProfileId",
                        column: x => x.BioProfileId,
                        principalTable: "BioProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserSocialLinks_SocialLinks_SocialLinkId",
                        column: x => x.SocialLinkId,
                        principalTable: "SocialLinks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "BioProfiles",
                keyColumn: "Id",
                keyValue: new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
                column: "UserAccountId",
                value: null);

            migrationBuilder.UpdateData(
                table: "BioProfiles",
                keyColumn: "Id",
                keyValue: new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"),
                column: "UserAccountId",
                value: null);

            migrationBuilder.UpdateData(
                table: "SocialLinks",
                keyColumn: "Id",
                keyValue: new Guid("77777777-7777-7777-7777-777777777777"),
                column: "Platform",
                value: 24);

            migrationBuilder.UpdateData(
                table: "SocialLinks",
                keyColumn: "Id",
                keyValue: new Guid("88888888-8888-8888-8888-888888888888"),
                column: "Platform",
                value: 3);

            migrationBuilder.UpdateData(
                table: "SocialLinks",
                keyColumn: "Id",
                keyValue: new Guid("99999999-9999-9999-9999-999999999999"),
                column: "Platform",
                value: 6);

            migrationBuilder.CreateIndex(
                name: "IX_SocialLinks_Platform",
                table: "SocialLinks",
                column: "Platform",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_BioProfiles_UserAccountId",
                table: "BioProfiles",
                column: "UserAccountId",
                unique: true,
                filter: "[UserAccountId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_UserAccounts_Email",
                table: "UserAccounts",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserAccounts_Username",
                table: "UserAccounts",
                column: "Username",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserSocialLinks_BioProfileId",
                table: "UserSocialLinks",
                column: "BioProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSocialLinks_BioProfileId_SocialLinkId",
                table: "UserSocialLinks",
                columns: new[] { "BioProfileId", "SocialLinkId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserSocialLinks_SocialLinkId",
                table: "UserSocialLinks",
                column: "SocialLinkId");

            migrationBuilder.AddForeignKey(
                name: "FK_BioProfiles_BackgroundEffects_BackgroundEffectId",
                table: "BioProfiles",
                column: "BackgroundEffectId",
                principalTable: "BackgroundEffects",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BioProfiles_UserAccounts_UserAccountId",
                table: "BioProfiles",
                column: "UserAccountId",
                principalTable: "UserAccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BioProfiles_BackgroundEffects_BackgroundEffectId",
                table: "BioProfiles");

            migrationBuilder.DropForeignKey(
                name: "FK_BioProfiles_UserAccounts_UserAccountId",
                table: "BioProfiles");

            migrationBuilder.DropTable(
                name: "UserAccounts");

            migrationBuilder.DropTable(
                name: "UserSocialLinks");

            migrationBuilder.DropIndex(
                name: "IX_SocialLinks_Platform",
                table: "SocialLinks");

            migrationBuilder.DropIndex(
                name: "IX_BioProfiles_UserAccountId",
                table: "BioProfiles");

            migrationBuilder.DropColumn(
                name: "UserAccountId",
                table: "BioProfiles");

            migrationBuilder.RenameColumn(
                name: "DisplayOrder",
                table: "Musics",
                newName: "Order");

            migrationBuilder.RenameIndex(
                name: "IX_Musics_BioProfileId_DisplayOrder",
                table: "Musics",
                newName: "IX_Musics_BioProfileId_Order");

            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "SocialLinks",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "BioProfiles",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "BioProfileSocialLinks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BioProfileId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SocialLinkId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Order = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
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

            migrationBuilder.UpdateData(
                table: "BioProfiles",
                keyColumn: "Id",
                keyValue: new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
                column: "UserId",
                value: "demo-user-001");

            migrationBuilder.UpdateData(
                table: "BioProfiles",
                keyColumn: "Id",
                keyValue: new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"),
                column: "UserId",
                value: "winter-user-002");

            migrationBuilder.UpdateData(
                table: "SocialLinks",
                keyColumn: "Id",
                keyValue: new Guid("77777777-7777-7777-7777-777777777777"),
                columns: new[] { "Platform", "Url" },
                values: new object[] { 9, "https://github.com" });

            migrationBuilder.UpdateData(
                table: "SocialLinks",
                keyColumn: "Id",
                keyValue: new Guid("88888888-8888-8888-8888-888888888888"),
                columns: new[] { "Platform", "Url" },
                values: new object[] { 4, "https://x.com" });

            migrationBuilder.UpdateData(
                table: "SocialLinks",
                keyColumn: "Id",
                keyValue: new Guid("99999999-9999-9999-9999-999999999999"),
                columns: new[] { "Platform", "Url" },
                values: new object[] { 14, "https://linkedin.com" });

            migrationBuilder.CreateIndex(
                name: "IX_BioProfiles_UserId",
                table: "BioProfiles",
                column: "UserId");

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
    }
}
