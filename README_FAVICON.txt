Favicon Generation Instructions for Root Directory:

The following files need to be generated from the black.png logo in /images/my-logos:

1. favicon.ico - A multi-size ICO file with 16x16 and 32x32 versions
2. apple-touch-icon.png - 180x180 PNG file
3. favicon-32x32.png - 32x32 PNG file
4. favicon-16x16.png - 16x16 PNG file
5. android-chrome-192x192.png - 192x192 PNG file
6. android-chrome-512x512.png - 512x512 PNG file

These files should be placed directly in the root directory of the website, not in the favicons folder.

You can use tools like:
- https://realfavicongenerator.net/ (online)
- Imagemagick (command line): 
  convert /images/my-logos/black.png -resize 16x16 favicon-16x16.png
  convert /images/my-logos/black.png -resize 32x32 favicon-32x32.png
  convert /images/my-logos/black.png -resize 180x180 apple-touch-icon.png
  convert /images/my-logos/black.png -resize 192x192 android-chrome-192x192.png
  convert /images/my-logos/black.png -resize 512x512 android-chrome-512x512.png
  
  # For favicon.ico (requires ImageMagick with ICO support)
  convert /images/my-logos/black.png -resize 16x16 favicon-16.png
  convert /images/my-logos/black.png -resize 32x32 favicon-32.png
  convert favicon-16.png favicon-32.png favicon.ico

- Photoshop or GIMP (desktop)
