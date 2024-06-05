import FileSaver from 'file-saver';

export const downloadFile = (data: ArrayBuffer, fileName: string) => {
  const blob = new Blob([data], { type: 'application/octet-stream' });
  FileSaver.saveAs(blob, fileName);
};
