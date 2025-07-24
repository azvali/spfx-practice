import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './HelloWorld.module.scss';
import type { IHelloWorldProps } from './IHelloWorldProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export interface IAnnouncement {
  Title: string;
  Id: number;
}

const HelloWorld = (props: IHelloWorldProps) => {
  const [announcements, setAnnouncements] = useState<IAnnouncement[]>([]);

  useEffect(() => {
    const getAnnouncements = async (): Promise<void> => {
      const url = `${props.siteUrl}/_api/web/lists/getbytitle('Announcements')/items?$select=Title,Id`;


      try {
        const response: SPHttpClientResponse = await props.spHttpClient.get(url, SPHttpClient.configurations.v1);
        
        const data = await response.json();

        if (data && data.value) {
          setAnnouncements(data.value);
        }
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };
    void getAnnouncements(); 
  }, []);

  const {
    description,
    isDarkTheme,
    hasTeamsContext,
    userDisplayName
  } = props;

  return (
    <section className={`${styles.helloWorld} ${hasTeamsContext ? styles.teams : ''}`}>
      <div className={styles.welcome}>
        <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
        <h2>Well done, {escape(userDisplayName)}!</h2>
        <div>Web part property value: <strong>{escape(description)}</strong></div>
      </div>

      <div>
        <h3>Announcements</h3>
        <ul>
          {announcements.map((item) => {
            return <li key={item.Id}>{item.Title}</li>;
          })}
        </ul>
      </div>
    </section>
  );
};

export default HelloWorld;
