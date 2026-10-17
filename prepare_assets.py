import numpy as np
from PIL import Image, ImageFilter, ImageDraw

def process_images():
    # 1. Load 3D avatar (1024x1024)
    avatar = Image.open("assets/avatar_3d.jpg").convert("RGB")
    w, h = avatar.size

    # Generate a smooth volumetric facial depth map for the centered portrait
    y_grid, x_grid = np.mgrid[0:h, 0:w].astype(np.float32)
    nx = (x_grid - w * 0.5) / (w * 0.5)  # -1 to 1
    ny = (y_grid - h * 0.5) / (h * 0.5)  # -1 to 1

    # Base head ellipsoid centered at (0, -0.05)
    head_dist = ((nx / 0.36) ** 2 + ((ny + 0.06) / 0.44) ** 2)
    head_depth = np.clip(1.0 - head_dist, 0.0, 1.0) ** 0.65 * 0.78

    # Shoulders / torso depth at bottom
    torso_dist = ((nx / 0.78) ** 2 + ((ny - 0.85) / 0.48) ** 2)
    torso_depth = np.clip(1.0 - torso_dist, 0.0, 1.0) ** 0.7 * 0.52

    # Neck cylinder
    neck_dist = ((nx / 0.18) ** 2 + ((ny - 0.45) / 0.25) ** 2)
    neck_depth = np.clip(1.0 - neck_dist, 0.0, 1.0) * 0.45

    # Nose ridge prominence
    nose_dist = ((nx / 0.065) ** 2 + ((ny + 0.03) / 0.14) ** 2)
    nose_depth = np.clip(1.0 - nose_dist, 0.0, 1.0) ** 1.2 * 0.24

    # Glasses frame & brow ridge
    left_lens = ((nx + 0.13) / 0.11) ** 2 + ((ny + 0.08) / 0.08) ** 2
    right_lens = ((nx - 0.13) / 0.11) ** 2 + ((ny + 0.08) / 0.08) ** 2
    glasses_depth = (np.clip(1.0 - left_lens, 0.0, 1.0) + np.clip(1.0 - right_lens, 0.0, 1.0)) * 0.12

    # Chin & cheekbones
    chin_dist = ((nx / 0.13) ** 2 + ((ny - 0.22) / 0.10) ** 2)
    chin_depth = np.clip(1.0 - chin_dist, 0.0, 1.0) * 0.12

    # Combine volumetric layers with luminance detail from the avatar
    arr_avatar = np.asarray(avatar).astype(np.float32) / 255.0
    luma = 0.299 * arr_avatar[:, :, 0] + 0.587 * arr_avatar[:, :, 1] + 0.114 * arr_avatar[:, :, 2]
    bg_mask = np.clip((luma - 0.04) * 8.0, 0.0, 1.0)

    combined_depth = np.maximum(np.maximum(head_depth, torso_depth), neck_depth)
    combined_depth = combined_depth + nose_depth + glasses_depth + chin_depth + (luma * 0.08)
    combined_depth = np.clip(combined_depth * bg_mask, 0.0, 1.0)

    depth_img = Image.fromarray((combined_depth * 255).astype(np.uint8), mode="L")
    depth_img = depth_img.filter(ImageFilter.GaussianBlur(radius=8))
    depth_img.save("assets/avatar_depth.png")

    # 2. Process original photo: replace white background with sleek dark studio backdrop & rim glow
    orig = Image.open("assets/profile_original.jpg").convert("RGB").resize((w, h), Image.Resampling.LANCZOS)
    arr_orig = np.asarray(orig).astype(np.float32) / 255.0

    # White background detection: high R, G, B and low saturation
    min_rgb = np.min(arr_orig, axis=2)
    max_rgb = np.max(arr_orig, axis=2)
    sat = max_rgb - min_rgb
    is_white_bg = (min_rgb > 0.90) & (sat < 0.08)

    # Create smooth alpha mask from non-background
    fg_mask = (~is_white_bg).astype(np.float32) * 255.0
    fg_mask_img = Image.fromarray(fg_mask.astype(np.uint8), mode="L")
    fg_mask_img = fg_mask_img.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(radius=2.5))
    alpha = np.asarray(fg_mask_img).astype(np.float32) / 255.0

    # Studio dark background with subtle cyan & violet glow matching 3D avatar
    bg_r = np.clip(0.03 + 0.06 * np.exp(-((nx - 0.35)**2 + (ny + 0.1)**2) / 0.35), 0, 1)
    bg_g = np.clip(0.04 + 0.14 * np.exp(-((nx + 0.35)**2 + (ny - 0.1)**2) / 0.35), 0, 1)
    bg_b = np.clip(0.08 + 0.22 * np.exp(-((nx)**2 + (ny)**2) / 0.45), 0, 1)
    studio_bg = np.stack([bg_r, bg_g, bg_b], axis=2)

    # Edge rim light where alpha transitions
    edge = np.clip(alpha * (1.0 - alpha) * 4.0, 0.0, 1.0)
    rim_color = np.zeros_like(arr_orig)
    rim_color[:, :, 0] = edge * 0.15
    rim_color[:, :, 1] = edge * 0.75
    rim_color[:, :, 2] = edge * 0.95

    # Slightly contrast-grade original photo to match cinematic studio tone
    graded_fg = np.clip((arr_orig - 0.5) * 1.08 + 0.48, 0.0, 1.0)
    alpha_3d = alpha[:, :, None]
    comp = graded_fg * alpha_3d + studio_bg * (1.0 - alpha_3d) + rim_color * 0.45
    comp = np.clip(comp * 255.0, 0, 255).astype(np.uint8)
    Image.fromarray(comp).save("assets/profile_dark.jpg", quality=95)

    # Also save depth map for original photo using its foreground mask
    orig_depth = np.clip((combined_depth * 0.85 + alpha * 0.25) * alpha, 0.0, 1.0)
    orig_depth_img = Image.fromarray((orig_depth * 255).astype(np.uint8), mode="L").filter(ImageFilter.GaussianBlur(radius=8))
    orig_depth_img.save("assets/profile_depth.png")
    print("Successfully generated avatar_depth.png, profile_dark.jpg, and profile_depth.png!")

if __name__ == "__main__":
    process_images()
