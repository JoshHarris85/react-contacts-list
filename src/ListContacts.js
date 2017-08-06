import React, { Component } from 'react';
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component {

  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState( {query: ''} )
  }

  render() {
    const { contacts, onDeleteContact } = this.props
    const { query } = this.state

    let showingContacts
    if(query){
      // Escape regex and dont care about case
      const match = new RegExp(escapeRegExp(query), 'i')
      // match.test to compare match.test <- query and contact.name <- contacts array selected
      showingContacts = contacts.filter((contact) => match.test(contact.name))
    } else {
      showingContacts = contacts
    }

    showingContacts.sort(sortBy('name'))

    return (
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input
            className='search-contacts'
            type='text'
            placeholder='Search contacts'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          <a
            href='#create'
            onClick={this.props.onNavigate}
            className='add-contact'
          >Add Contact</a>
        </div>

        { showingContacts.length != contacts.length && (
          <div className='showing-contacts'>
            <span> Now showing { showingContacts.length } of { contacts.length } total. </span>
            <button onClick={ () => this.clearQuery() }> Show All </button>
          </div>
        )}

        <ol className='contact-list'>
          {showingContacts.map((contact) => (
              <li className='contact-list-item' key={contact.id}>
                <div className='contact-avatar' style={{
                backgroundImage: `url(${contact.avatarURL})`
                }}/>
                <div className='contact-details'>
                  <p>{contact.name}</p>
                  <p>{contact.email}</p>
                </div>
                <button className='contact-remove' onClick={ () => onDeleteContact(contact) }>Remove</button>
              </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default ListContacts
