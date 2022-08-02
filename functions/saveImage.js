import * as MediaLibrary from "expo-media-library";

export const saveImage = async (URI) => {
  console.log("start download...");
  try {
    const asset = await MediaLibrary.createAssetAsync(URI);
    const album = await MediaLibrary.getAlbumAsync("paidPaiper");
    if (album === null) {
      await MediaLibrary.createAlbumAsync("paidPaiper", asset);
    } else {
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    }
  } catch (e) {
    console.log(e);
  }
  console.log("succsess");
}; 
