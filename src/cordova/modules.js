import path from "node:path";
import { isCordova } from "./util";

const BACKUP_ZIP = "node_modules.zip";

function getBackupZipPath() {
  return path.join(cordova.file.dataDirectory, BACKUP_ZIP);
}

export function remove() {
  return new Promise((resolve, reject) => {
    window.resolveLocalFileSystemURL(
      getBackupZipPath(),
      (backupEntry) => {
        backupEntry.remove(
          () => resolve(),
          (error) => reject(error),
        );
      },
      (error) => reject(error),
    );
  });
}

export function copy(uri) {
  return new Promise((resolve, reject) => {
    window.resolveLocalFileSystemURL(
      cordova.file.dataDirectory,
      (parentEntry) => {
        window.resolveLocalFileSystemURL(
          uri,
          (fileEntry) => {
            fileEntry.copyTo(
              parentEntry,
              BACKUP_ZIP,
              () => resolve(),
              (error) => reject(error),
            );
          },
          (error) => reject(error),
        );
      },
    );
  });
}

export function hasModules() {
  return new Promise((resolve) => {
    if (isCordova()) {
      window.resolveLocalFileSystemURL(
        getBackupZipPath(),
        (backupEntry) => {
          backupEntry.getMetadata(
            () => {
              resolve(true);
            },
            () => {
              resolve(false);
            },
          );
        },
        () => {
          resolve(false);
        },
      );
    } else {
      resolve(false);
    }
  });
}
