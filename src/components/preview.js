import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import matter from 'gray-matter';

// Styled Components (unchanged)
const AgendaLivePreview = styled.div`...`; // Keep all your existing styled components here
const PreviewIn = styled.div`...`;
const AgendaHeader = styled.div`...`;
const TMILogo = styled.div`...`;
const AgendaSideBar = styled.div`...`;
const AgendaList = styled.div`...`;
const Ballots = styled.div`...`;
const ClubName = styled.div`...`;
const AgendaItem = styled.div`...`;
const AgendaItemTitle = styled.div`...`;
const DFlex = styled.div`...`;
const ClubTitle = styled.div`...`;
const ClubNumber = styled.div`...`;
const ClubMeetingDate = styled.div`...`;
const ClubMeetingTheme = styled.div`...`;
const TMInternational = styled.div`...`;
const Main = styled.main`...`;
const AgendaActionButtons = styled.div`...`;
const Button = styled.button`...`;
const Field = styled.input`...`;
const Textarea = styled.textarea`...`;
const SaveDataWrap = styled.div`...`;
const AgendaTitle = styled.h4`...`;
const AgendaTM = styled.span`...`;
const AgendaContent = styled.div`...`;
const LoaderIndicator = styled.span`...`;
const Title = styled.h1`...`;

import logo from '../toastmasters-logo.png';

function MeetingAgendaPreview({ className }) {

    const [loading, setLoading] = useState(true);
    const [meeting, setMeeting] = useState({});
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchAgenda = async () => {
            try {
                const res = await fetch('/agendas/weekly-agenda.md');
                const text = await res.text();
                const { data, content } = matter(text);
                setMeeting(data);
                setContent(content);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch agenda:", err);
                setLoading(false);
            }
        };

        fetchAgenda();
    }, []);

    const printMyAgenda = () => {
        window.print();
    };

    if (loading) {
        return <Main><LoaderIndicator className="fa fa-spinner fa-spin" /></Main>;
    }

    return (
        <Main>
            <SaveDataWrap id="a-buttons" className="buttons">
                <Button className="bg-primary btn-outline btn-print" onClick={printMyAgenda}>
                    <span>Print</span>
                </Button>
            </SaveDataWrap>
            <AgendaLivePreview className={`${className} print-preview`}>
                <PreviewIn>
                    <AgendaHeader>
                        <hr className="border-header"></hr>
                        <hr className="border-header-thin"></hr>
                        <hr className="border-white"></hr>
                        <hr className="border-light"></hr>
                        <TMILogo>
                            <img src={logo} className="App-logo" alt="logo" />
                        </TMILogo>
                    </AgendaHeader>
                    <AgendaList>
                        <ClubName>
                            <DFlex>
                                <ClubTitle>
                                    <Title>{meeting.title}</Title>
                                </ClubTitle>
                            </DFlex>
                        </ClubName>
                        <div className="agendas-wrap">
                            <AgendaItem className="agenda">
                                <AgendaContent className="agenda-content">
                                    <ReactMarkdown>{content}</ReactMarkdown>
                                </AgendaContent>
                            </AgendaItem>
                        </div>
                    </AgendaList>
                    <AgendaSideBar>
                        <div className="inWrap">
                            <TMInternational>Toastmasters International <a rel="noopener" target="blank" href="https://www.toastmasters.org/">www.toastmasters.org</a></TMInternational>
                        </div>
                    </AgendaSideBar>
                    <Ballots>
                        <span>Better Table Topics Speaker</span>
                        <span>Better Featured Speaker</span>
                        <span>Better Evaluator</span>
                    </Ballots>
                </PreviewIn>
            </AgendaLivePreview>
        </Main>
    )
}

MeetingAgendaPreview.propTypes = {
    className: PropTypes.string,
};

export default MeetingAgendaPreview;