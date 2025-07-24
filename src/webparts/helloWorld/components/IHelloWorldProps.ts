import { SPHttpClient } from '@microsoft/sp-http';

export interface IHelloWorldProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  myNewProperty: string;
  siteUrl: string;
  spHttpClient: SPHttpClient;
}
