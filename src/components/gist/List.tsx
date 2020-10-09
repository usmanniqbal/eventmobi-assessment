import React, { useState } from "react";
import BadgesSection from "./BadgesSection";
import { GistService } from "./GistService";
import { Gist } from "./models/Gist";
import ForkUserSection from "./ForkUserSection";

interface IFormState {
    username: string,
    gists: Gist[];
    page: number;
    showLoadMore: boolean;
    isLoading: boolean;
    error: string;
}

const List = () => {
    const initialState: IFormState = {
        username: '',
        gists: [],
        page: 1,
        showLoadMore: false,
        isLoading: false,
        error: ''
    }
    const [values, setValues] = useState(initialState);

    const gistService = new GistService();

    const populateList = async (page: number) => {
        let { username, gists } = values;
        let errorMsg;
        let data: Gist[];
        setValues({ ...values, gists: [], isLoading: true });
        try {
            data = await gistService.getGistDataByUsername(username, page);
            if (page !== 1) {
                gists.push(...data);
            } else {
                gists = data;
            }
        } catch (e) {
            data = [];
            if (e.response.status === 403) {
                errorMsg = e.response.statusText;
            }
        }
        setValues({ ...values, isLoading: false, gists, page, showLoadMore: data.length === 10, error: errorMsg });
    }

    const loadMore = () => {
        const { page } = values;
        populateList(page + 1);
    }

    const handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        setValues({ ...values, [e.currentTarget.name]: e.currentTarget.value })
    };

    const handleKeyUp = (e: any) => {
        if (e.keyCode === 13) {
            populateList(1);
        }
    }

    return (
        <div className="App">
            <h1> Public Gists List</h1>
            <div className="col-md-12 form-wrapper">
                <div className="form-group col-md-12">
                    <input
                        type="text"
                        id="username"
                        onChange={handleInputChanges}
                        onKeyUp={handleKeyUp}
                        name="username"
                        className="form-control"
                        placeholder="Enter username"
                    />
                </div>
                <div className="form-group col-md-4 pull-right">
                    <button id="populate" className="btn btn-success" type="button" onClick={() => populateList(1)}>Fetch List</button>
                </div>
            </div>
            {
                (values.isLoading || values.error) && (
                    <div className="container">
                        <div className="row">{values.error ?? 'Please wait...'}</div>
                    </div>
                )
            }
            <div className="container">
                <div className="row">
                    <table className="table table-bordered">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Files</th>
                                <th scope="col">Fork Users</th>
                                <th scope="col">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {values.gists && values.gists.map((gist, i) => (
                                <tr key={i}>
                                    <BadgesSection files={gist.files} />
                                    <ForkUserSection forksUrl={gist.forks_url} />
                                    <td>{gist?.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {values.showLoadMore && (<div className="form-group col-md-4 pull-right">
                    <button id="loadMore" className="btn" type="button" onClick={loadMore}>Load More</button>
                </div>)
                }
            </div>
        </div >
    );
}

export default List;
