using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BioProfile.Infrastructure.Data.Migrations.Postgres
{
    /// <inheritdoc />
    public partial class InitialPostgres : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EnglishName",
                table: "BioProfiles");

            migrationBuilder.AlterColumn<int>(
                name: "Views",
                table: "BioProfiles",
                type: "int",
                nullable: true,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldDefaultValue: 0);

            migrationBuilder.AlterColumn<double>(
                name: "ProfileOpacity",
                table: "BioProfiles",
                type: "float",
                nullable: true,
                defaultValue: 0.94999999999999996,
                oldClrType: typeof(double),
                oldType: "float",
                oldDefaultValue: 0.94999999999999996);

            migrationBuilder.AlterColumn<double>(
                name: "ProfileBlur",
                table: "BioProfiles",
                type: "float",
                nullable: true,
                defaultValue: 10.5,
                oldClrType: typeof(double),
                oldType: "float",
                oldDefaultValue: 10.5);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Views",
                table: "BioProfiles",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true,
                oldDefaultValue: 0);

            migrationBuilder.AlterColumn<double>(
                name: "ProfileOpacity",
                table: "BioProfiles",
                type: "float",
                nullable: false,
                defaultValue: 0.94999999999999996,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true,
                oldDefaultValue: 0.94999999999999996);

            migrationBuilder.AlterColumn<double>(
                name: "ProfileBlur",
                table: "BioProfiles",
                type: "float",
                nullable: false,
                defaultValue: 10.5,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true,
                oldDefaultValue: 10.5);

            migrationBuilder.AddColumn<string>(
                name: "EnglishName",
                table: "BioProfiles",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "BioProfiles",
                keyColumn: "Id",
                keyValue: new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
                column: "EnglishName",
                value: "Demo Profile");

            migrationBuilder.UpdateData(
                table: "BioProfiles",
                keyColumn: "Id",
                keyValue: new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"),
                column: "EnglishName",
                value: "Winter Theme");
        }
    }
}
