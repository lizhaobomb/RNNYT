//
//  ImageLibraryManager.h
//  RNNYT
//
//  Created by lizhao on 2017/3/20.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <UIKit/UIKit.h>

@interface ImageLibraryManager : RCTEventEmitter <RCTBridgeModule, UIImagePickerControllerDelegate, UINavigationControllerDelegate>

@property(nonatomic, copy) RCTResponseSenderBlock callback;
@property(nonatomic, copy) RCTPromiseResolveBlock resolve;
@property(nonatomic, copy) RCTPromiseRejectBlock reject;

@end
