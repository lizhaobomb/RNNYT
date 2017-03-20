//
//  ImageLibraryManager.m
//  RNNYT
//
//  Created by lizhao on 2017/3/20.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "ImageLibraryManager.h"
#import <React/RCTLog.h>
@import MobileCoreServices;

static NSString *const StartEvent = @"ImageSelectionStarted";
static NSString *const EndEvent = @"ImageSelectionEnded";

@implementation ImageLibraryManager
RCT_EXPORT_MODULE();


RCT_EXPORT_METHOD(selectImage:(RCTResponseSenderBlock)callback){
  RCTLogInfo(@"Select image...");
  self.callback = callback;
  [self openPicker];
}

RCT_EXPORT_METHOD(selectImagePromise:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
  RCTLogInfo(@"Select image...");
  self.resolve = resolve;
  self.reject = reject;
  [self openPicker];
};

- (NSArray<NSString *> *)supportedEvents {
  return @[StartEvent, EndEvent];
}

- (void)openPicker {
  [self sendEventWithName:StartEvent body:nil];
  UIImagePickerController *picker = [[UIImagePickerController alloc] init];
  picker.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
  picker.mediaTypes = @[(NSString *)kUTTypeImage];
  picker.modalPresentationStyle = UIModalPresentationCurrentContext;
  picker.delegate = self;
  UIViewController *root = [[[[UIApplication sharedApplication] delegate] window] rootViewController];
  [root presentViewController:picker animated:YES completion:nil];
}

- (NSDictionary *)constantsToExport {
  return @{@"startEvent": StartEvent, @"endEvent": EndEvent};
}

#pragma mark - UIImagePickerController
- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary<NSString *,id> *)info {
  NSString *fileName = [[[NSUUID UUID] UUIDString] stringByAppendingString:@".jpg"];
  NSString *path = [[NSTemporaryDirectory() stringByStandardizingPath] stringByAppendingPathComponent:fileName];
  UIImage *image = [info objectForKey:UIImagePickerControllerOriginalImage];
  NSData *data = UIImageJPEGRepresentation(image, 0);
  [data writeToFile:path atomically:YES];
  NSURL *fileURL = [NSURL fileURLWithPath:path];
  NSString *filePath = [fileURL absoluteString];
  RCTLog(@"%@", filePath);
  if(self.callback) {
    self.callback(@[filePath]);
  } else if(self.resolve) {
    self.resolve(filePath);
  }
  [self sendEventWithName:EndEvent body:filePath];
  [picker dismissViewControllerAnimated:YES completion:nil];
}

@end
