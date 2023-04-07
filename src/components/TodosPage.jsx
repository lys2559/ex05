import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Table, Button } from 'react-bootstrap'

const TodosPage = () => {
    const [list, setlist] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [last, setLast] = useState(1);

    const getPosts = () => {
        setLoading(true);
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => {
                console.log(json);
                setLast(Math.ceil(json.length / 5));
                let start = (page - 1) * 5 + 1;
                let end = page * 5;
                setlist(json.filter(post => post.id >= start && post.id <= end));
                setLoading(false);
            })
    }

    useEffect(() => {
        getPosts();
    }, [page]);

    if (loading) return <h1 className='text-center my-5'>로딩중......</h1>
    return (
        <Container>
            <Row>
                <Col className='text-center'>
                    <h1>할일목록</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr className='text-center'>
                                <td>ID.</td>
                                <td>Title</td>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map(post =>
                                <tr key={post.id}>
                                    <td className='text-center'>{post.id}</td>
                                    <td className='text-start'>
                                        <div className='ellipsis'>
                                            {post.title}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <div class="text-center my-3">
                        <Button
                            disabled={page === 1 && true}
                            onClick={() => setPage(page - 1)}>이전</Button>
                        <span class="mx-3">{page}/{last}</span>
                        <Button
                            disabled={page === last && true}
                            onClick={() => setPage(page + 1)}>다음</Button>
                    </div>
                    <hr />
                </Col>
            </Row>
        </Container>
    )
}

export default TodosPage