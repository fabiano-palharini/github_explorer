import React from 'react';
import logo from '../../assets/logo.svg';
import { FiChevronRight } from 'react-icons/fi';

import { Title, Form } from './styles';

const Dashboard: React.FC = () => {
    return (
        <>
            <img src={logo} alt="Github Explorer" />
            <Title>Explore Github repositories</Title>

            <Form>
                <input placeholder="Type the repository name here"/>
                <button type="submit">Search</button>
            </Form>
        </>
    );
}

export default Dashboard;
