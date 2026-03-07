using System.ComponentModel.DataAnnotations;
using BioProfile.Domain.Enums;

namespace BioProfile.Domain.Entities;

/// <summary>
/// Cấu hình hiệu ứng background với particle system
/// </summary>
public class BackgroundEffect : BaseEntity
{
    public string Name { get; set; } = null!; // Tên cấu hình (VD: "Red Gaming Theme")

    // --- NHÓM 1: GIAO DIỆN (VISUAL) ---
    public string ColorHex { get; set; } = "#ffffff"; // Mã màu (VD: #ff0000)

    public ParticleShape Shape { get; set; } = ParticleShape.Circle; // Hình dáng

    public double Opacity { get; set; } = 0.5; // Độ mờ (0.1 -> 1.0)

    public double SizeMin { get; set; } = 1.0; // Kích thước nhỏ nhất
    public double SizeMax { get; set; } = 3.0; // Kích thước lớn nhất

    // --- NHÓM 2: CHUYỂN ĐỘNG (PHYSICS) ---

    public ParticlePreset Preset { get; set; } = ParticlePreset.Network; // Kiểu bay

    public double MoveSpeed { get; set; } = 2.0; // Tốc độ bay

    public int ParticleCount { get; set; } = 80; // Số lượng hạt (Mật độ)

    // --- NHÓM 3: TƯƠNG TÁC (INTERACTIVITY) ---

    public bool EnableLinks { get; set; } = true; // Có hiện dây nối không?
    public bool EnableHoverEffect { get; set; } = true; // Chuột vào có hiệu ứng không?

    // Metadata
    public bool IsActive { get; set; } = true;
}
