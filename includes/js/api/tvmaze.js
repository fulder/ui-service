/* global axios */
/* exported TvMazeApi */
class TvMazeApi {
  constructor () {
    this.apiAxios = axios.create({
      baseURL: 'https://api.tvmaze.com',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async search (qParams) {
    const res = await this.apiAxios.get(`/search/shows?q=${qParams.search}`);

    const moshanItems = new MoshanItems('show');
    for (let i=0; i<res.data.length; i++) {
      moshanItems.items.push(this.getMoshanItem(res.data[i].show));
    }
    return moshanItems;
  }

  async getItemById(qParams) {
    const res = await this.apiAxios.get(`/shows/${qParams.api_id}`);
    return this.getMoshanItem(res.data);
  }

  getEpisodes(qParams) {
    return this.apiAxios.get(`/shows/${qParams.api_id}/episodes?specials=1`);
  }

  getEpisode(qParams) {
    return this.apiAxios.get(`/episodes/${qParams.api_id}`);
  }

  getMoshanItem(show) {
    let poster = '/includes/img/image_not_available.png';
    if (show.image !== null && show.image.medium !== undefined) {
      poster = show.image.medium;
    }

    return new MoshanItem(
      show.id,
      poster,
      show.name,
      show.premiered,
      show.status,
      show.summary,
      true,
      'show'
    );
  }

  getMoshanEpisodes(episodes) {
    return new MoshanEpisodes(
        episodes.reverse(),
        1
    );
  }

  getMoshanEpisode(episode) {
    const seasonNbr = (episode.season < 10 ? '0' : '') + episode.season;
    const episodeNbr = (episode.number < 10 ? '0' : '') + episode.number;

    const episodeId = `S${seasonNbr}E${episodeNbr}`;

    return new MoshanEpisode(
      episode.id,
      episodeId,
      episode.name,
      episode.airdate
    );
  }
}
