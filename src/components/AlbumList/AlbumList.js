import React from 'react';
import Album from '../Album/Album'

class AlbumList extends React.Component {
  render(){
    return (
      <div className="AlbumList">
        {this.props.albumsList.map(album => {
          return <Album key={album.id}
                     name = {album.name}
                    picture = {album.picture} />
        })}
      </div>
    )
  }
 }
export default AlbumList;
