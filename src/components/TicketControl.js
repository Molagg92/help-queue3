import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import { connect } from 'react-redux';

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      selectedTicket: null,
      mainTicketList: [],
    };
  }

    // Methods are functions that are called on an object.
    //handleClick will be called on an instace of the TickenControll class.
    handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedTicket: null
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage,
      }));
    }
  }

    // function takes a newTicket as an argument, then we instanciate newMainTickeList as o not alter state directly, then we use setState the turn mainTicketLsit, into newMainTicketList. Finaly making the Ticket list visible, and the form not visible.
    handleAddingNewTicketToList = (newTicket) => {
      this.setState((prevState) => ({
        mainTicketList: [...prevState.mainTicketList, newTicket],
        formVisibleOnPage: false,
      }));
    }

    handleChangingSelectedTicket = (id) => {
      const selectedTicket = this.state.mainTicketList.filter(ticket => ticket.id === id)[0];
      this.setState({selectedTicket: selectedTicket});
    }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null; // new code

    if (this.state.selectedTicket != null) {
      currentlyVisibleState = <TicketDetail ticket = {this.state.selectedTicket} />
      buttonText = "Return to Ticket List";
      // While our TicketDetail component only takes placeholder data, we will eventually be passing the value of selectedTicket as a prop.
    }
    else if (this.state.formVisibleOnPage) {
      // This conditional needs to be updated to "else if."
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList}  />;
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = <TicketList ticketList={this.state.mainTicketList} onTicketSelection={this.handleChangingSelectedTicket} />;
      // Because a user will actually be clicking on the ticket in the Ticket component, we will need to pass our new handleChangingSelectedTicket method as a prop.
      buttonText = "Add Ticket";
    }

    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button> { /* new code */ }
      </React.Fragment>
    );
  }

}

TicketControl = connect()(TicketControl);

export default TicketControl;