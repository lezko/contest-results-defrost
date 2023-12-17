import { useActions } from '@/redux/actions.ts';
import { parseContest } from '@/utils/parse.ts';
import { useState } from 'react';
import { Button, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

export const SelectFile = () => {
    const { setInitialData, setContest, setCurrentResultIdx } = useActions();
    const [data, setData] = useState('');

    const handleChange = (e: any) => {
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = (e.target!.result) + '';
            setData(text);
        };
        reader.readAsText(e.target.files[0]);
    };

    const navigate = useNavigate();
    const [freezeTimeStart, setFreezeTimeStart] = useState('');
    const handleSubmit = () => {
        const contest = parseContest(data);
        setInitialData({ contest: JSON.parse(JSON.stringify(contest)), freezeStartTime: +freezeTimeStart });

        setContest(contest);
        setCurrentResultIdx(contest.teams.length - 1);
        navigate('/results');
    };

    return (
        <div>
            <input type="file" onChange={handleChange} />
            <Input placeholder="Время начала заморозки (сек)" onChange={e => setFreezeTimeStart(e.target.value)} />
            <Button onClick={handleSubmit}>К результатам</Button>
        </div>
    );
};
