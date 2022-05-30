export const selectImages = async (func, images): Promise<string[]> => {
  if (images) {
    await func.click(
      ".dwxx2s2f:nth-child(1) > div:nth-child(1) > .tojvnm2t:nth-child(1) > .oajrlxb2:nth-child(1) > div:nth-child(1) > div:nth-child(1) > .tv7at329:nth-child(1) > .iyyx5f41:nth-child(1) > .bp9cbjyn:nth-child(1) > .hu5pjgll:nth-child(1)"
    );
    await func.delay(2);
    return await func.uploadImage(
      images,
      ".oajrlxb2:nth-child(2) > .j83agx80 > .rq0escxv > .l9j0dhe7 > .rq0escxv > .rq0escxv:nth-child(1)"
    );
  }
  return [];
};
