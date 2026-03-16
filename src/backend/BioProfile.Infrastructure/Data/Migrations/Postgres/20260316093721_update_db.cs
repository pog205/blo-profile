using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BioProfile.Infrastructure.Data.Migrations.Postgres
{
    /// <inheritdoc />
    public partial class update_db : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BioProfiles_UserAccounts_UserAccountId",
                table: "BioProfiles");

            migrationBuilder.AddColumn<Guid>(
                name: "UserAccountId1",
                table: "BioProfiles",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "BioProfiles",
                keyColumn: "Id",
                keyValue: new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
                column: "UserAccountId1",
                value: null);

            migrationBuilder.UpdateData(
                table: "BioProfiles",
                keyColumn: "Id",
                keyValue: new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"),
                column: "UserAccountId1",
                value: null);

            migrationBuilder.CreateIndex(
                name: "IX_BioProfiles_UserAccountId1",
                table: "BioProfiles",
                column: "UserAccountId1");

            migrationBuilder.AddForeignKey(
                name: "FK_BioProfiles_UserAccounts_UserAccountId",
                table: "BioProfiles",
                column: "UserAccountId",
                principalTable: "UserAccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BioProfiles_UserAccounts_UserAccountId1",
                table: "BioProfiles",
                column: "UserAccountId1",
                principalTable: "UserAccounts",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BioProfiles_UserAccounts_UserAccountId",
                table: "BioProfiles");

            migrationBuilder.DropForeignKey(
                name: "FK_BioProfiles_UserAccounts_UserAccountId1",
                table: "BioProfiles");

            migrationBuilder.DropIndex(
                name: "IX_BioProfiles_UserAccountId1",
                table: "BioProfiles");

            migrationBuilder.DropColumn(
                name: "UserAccountId1",
                table: "BioProfiles");

            migrationBuilder.AddForeignKey(
                name: "FK_BioProfiles_UserAccounts_UserAccountId",
                table: "BioProfiles",
                column: "UserAccountId",
                principalTable: "UserAccounts",
                principalColumn: "Id");
        }
    }
}
