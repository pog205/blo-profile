using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BioProfile.Infrastructure.Data.Migrations.Postgres
{
    /// <inheritdoc />
    public partial class InitialPostgres_Final : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EnglishName",
                table: "BioProfiles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "BioProfiles",
                keyColumn: "Id",
                keyValue: new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
                column: "EnglishName",
                value: null);

            migrationBuilder.UpdateData(
                table: "BioProfiles",
                keyColumn: "Id",
                keyValue: new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"),
                column: "EnglishName",
                value: null);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EnglishName",
                table: "BioProfiles");
        }
    }
}
