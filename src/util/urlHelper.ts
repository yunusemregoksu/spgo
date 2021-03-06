'use strict';
import * as path from 'path';
import * as vscode from 'vscode';

import Uri from 'vscode-uri'

export class UrlHelper{
    
    //Make sure there is a leading slash.
    public static ensureLeadingSlash(filePath : string) : string{
        if(!filePath.startsWith(path.sep)){
            filePath = path.sep + filePath;
        }
        return filePath;
    }

    //Make sure there is a leading web slash (This is sort of a multi-platform hack).
    public static ensureLeadingWebSlash(filePath : string) : string{
        if(!filePath.startsWith('/')){
            filePath = '/' + filePath;
        }
        return filePath;
    }

    //get the file path relative to the current SharePoint site.
    public static getSiteRelativeFileUri(fileName : string) : string {
        return fileName.split(vscode.window.spgo.config.workspaceRoot + path.sep)[1].toString();
    }

    public static getFileName(filePath : string) : string{
       return filePath.substring(filePath.lastIndexOf(path.sep)+1);
    }

    // Format a server relative url based on local file uri.
    public static getServerRelativeFileUri(fileName : string) : Uri {
        let relativeFilePath : string = this.getSiteRelativeFileUri(fileName);
        let remoteFolder = relativeFilePath.substring(0, relativeFilePath.lastIndexOf(path.sep));
        let remoteFileName = this.getFileName(relativeFilePath);//relativeFilePath.substring(relativeFilePath.lastIndexOf(path.sep)+1);
        let remoteFileUrl = UrlHelper.formatWebFolder(remoteFolder) + remoteFileName; 
    
        return Uri.parse(this.removeTrailingSlash(vscode.window.spgo.config.sharePointSiteUrl) + remoteFileUrl);
    }

    public static formatUriAsFileName(uri : string){
        return uri.replace(/[^a-zA-Z0-9]/g,'_');
    }

    // properly append leading and trailing '/'s to a folder path.
    public static formatWebFolder(filePath : string) : string {
        if(!filePath.startsWith('/')){
            filePath = '/' + filePath;
        }
        if(!filePath.endsWith('/')){
            filePath = filePath + '/';
        }
        return filePath;
    } 

    // make our glob processor os aware.
    // this is also for cross-platform compatibility, but much less hacky.
    public static osAwareGlobStar(){
        return path.sep + '**' + path.sep + '*.*';
    }

    //Make sure there is no leading slash.
    public static removeTrailingSlash(url: string): string {
        return url.replace(/(\/$)|(\\$)/, '');
    }
    
    //Make sure there is no leading slash.
    public static removeLeadingSlash(url: string): string {
        return url.replace(/(^\/)|(^\\)/, '');
    }

    //Make sure there are no slashes either place.
    public static trimSlashes(url: string): string {
        return url.replace(/(^\/)|(^\\)|(\/$)|(\\$)/g, '');
    }
}