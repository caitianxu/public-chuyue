import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { AudiosPage } from '../audios/audios';
import { VideosPage } from '../videos/videos';
import { BooksPage } from '../books/books';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = BooksPage;
  tab3Root = AudiosPage;
  tab4Root = VideosPage;

  constructor() {

  }
}
