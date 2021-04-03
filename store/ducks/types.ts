interface FirstAppearedInIssue {
  api_detail_url: string;
  id: number;
  name: string;
  issue_number: string;
}

interface Image {
  icon_url: string;
  medium_url: string;
  screen_url: string;
  screen_large_url: string;
  small_url: string;
  super_url: string;
  thumb_url: string;
  tiny_url: string;
  original_url: string;
  image_tags: string;
}

interface Origin {
  api_detail_url: string;
  id: number;
  name: string;
}

interface Publisher {
  api_detail_url: string;
  id: number;
  name: string;
}

interface CharacterEnemy {
  api_detail_url: string;
  id: number;
  name: string;
  site_detail_url: string;
}

interface CharacterFriend {
  api_detail_url: string;
  id: number;
  name: string;
  site_detail_url: string;
}

interface Creator {
  api_detail_url: string;
  id: number;
  name: string;
  site_detail_url: string;
}

interface IssueCredit {
  api_detail_url: string;
  id: number;
  name: string;
  site_detail_url: string;
}

interface Power {
  api_detail_url: string;
  id: number;
  name: string;
}

interface Publisher {
  api_detail_url: string;
  id: number;
  name: string;
}

interface TeamEnemy {
  api_detail_url: string;
  id: number;
  name: string;
  site_detail_url: string;
}

interface TeamFriend {
  api_detail_url: string;
  id: number;
  name: string;
  site_detail_url: string;
}

interface Team {
  api_detail_url: string;
  id: number;
  name: string;
  site_detail_url: string;
}

interface VolumeCredit {
  api_detail_url: string;
  id: number;
  name: string;
  site_detail_url: string;
}

export interface CharacterType {
  aliases?: any;
  api_detail_url: string;
  birth?: any;
  count_of_issue_appearances: number;
  date_added: string;
  date_last_updated: string;
  deck?: any;
  description?: string;
  first_appeared_in_issue: FirstAppearedInIssue;
  gender: number;
  id: number;
  image: Image;
  name: string;
  origin: Origin;
  publisher: Publisher;
  real_name: string;
  site_detail_url: string;
}

export interface CharactersResponse {
  error: string;
  limit: number;
  offset: number;
  number_of_page_results: number;
  number_of_total_results: number;
  status_code: number;
  version: string;
  results: CharacterType[];
}

export interface CharacterDetailType {
  aliases: string;
  api_detail_url: string;
  birth?: any;
  character_enemies: CharacterEnemy[];
  character_friends: CharacterFriend[];
  count_of_issue_appearances: number;
  creators: Creator[];
  date_added: string;
  date_last_updated: string;
  deck: string;
  description: string;
  first_appeared_in_issue: FirstAppearedInIssue;
  gender: number;
  id: number;
  image: Image;
  issue_credits: IssueCredit[];
  issues_died_in: any[];
  movies: any[];
  name: string;
  origin: Origin;
  powers: Power[];
  publisher: Publisher;
  real_name: string;
  site_detail_url: string;
  story_arc_credits: any[];
  team_enemies: TeamEnemy[];
  team_friends: TeamFriend[];
  teams: Team[];
  volume_credits: VolumeCredit[];
}

export interface CharacterDetailTypeResponse {
  error: string;
  limit: number;
  offset: number;
  number_of_page_results: number;
  number_of_total_results: number;
  status_code: number;
  results: CharacterDetailType;
  version: string;
}
