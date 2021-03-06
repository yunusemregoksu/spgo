'use strict';
import * as vscode from 'vscode';

declare module 'vscode' {
    export namespace window {
         export let spgo: IAppManager;
    }
}

export interface IAppManager{  
    credentials? : ICredential;
    config? : IConfig;
    outputChannel: vscode.OutputChannel;
    statusBarItem: vscode.StatusBarItem;

    initialize() : Promise<any>;
}

export interface ICredential{
    username? : string;
    domain? : string;
    password? : string;
}

export interface IConfig{
    authenticationType? : string;
    authenticationDetails? : any;
    checkInMessage? : string,
    publishingScope? : string;
    publishWorkspaceGlobPattern? : string;
    remoteFolders? : string[];
    sharePointSiteUrl? : string;
    sourceDirectory? : string;      // The relative directory structure underneath the VSCode local workspace root directory
    storeCredentials? : Boolean;
    workspaceRoot? : string;        // (internal) The full path to the local workspace root (VS Workspace root + sourceDirectory)
}

export interface IError {
    message: string;
}

export interface ISPFileInformation{
    checkOutType : number;
    checkOutBy? : string;
    name : string;
    timeLastModified : Date;
}

export interface IPublishingAction{
    contentUri: string;
    scope : string;
    message : string;
}