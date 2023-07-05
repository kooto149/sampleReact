import { Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

function Util(){
    return  (
        <>
        <br />
        <ButtonToolbar>
          <ButtonGroup className="me-2">
            <Button onClick={movePage}>StringUtil</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button>validationUtil</Button>
          </ButtonGroup>
        </ButtonToolbar>
        </>
      );
}
const movePage  = ()=>{
	window.navigate('/StringUtil',{});
}
export default Util;