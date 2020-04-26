import React, { useState, FormEvent } from 'react';
import logo from '../../assets/logo.svg';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import { Title, Form, Repositories, Error } from './styles';

interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    }
}

const Dashboard: React.FC = () => {
    const [newRepo, setNewRepo] = useState('');
    const [inputError, setInputError] = useState('');
    const [repositories, setRepositories] = useState<Repository[]>([]);

    async function handleAddRepository(event: FormEvent<HTMLFormElement>) : Promise<void> {
        event.preventDefault();

        if (!newRepo) {
            setInputError("Please inform the repository's owner/name");
            return;
        }

        try {
            const response = await api.get<Repository>(`repos/${newRepo}`);
            const repository = response.data;                                  //repository.full_name


            setRepositories([...repositories, repository]);
            setNewRepo('');
            setInputError('');
        } catch (err) {
            setInputError('Error when searching this repository');
        }
    }

    return (
        <>
            <img src={logo} alt="Github Explorer" />
            <Title>Explore Github repositories</Title>

            <Form hasError={Boolean(inputError)} onSubmit={handleAddRepository}>
                <input value={newRepo} onChange={e=>setNewRepo(e.target.value)} placeholder="Type the repository name here"/>
                <button type="submit">Search</button>
            </Form>

            { inputError && <Error>{inputError}</Error> }

            <Repositories>
                {repositories.map(repository => (
                    <a key={repository.full_name} href="test">
                        <img src={repository.owner.avatar_url}
                             alt={repository.owner.login} />
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>
                        <FiChevronRight size={20} />
                    </a>
                ))}
            </Repositories>
        </>
    );
}

export default Dashboard;
