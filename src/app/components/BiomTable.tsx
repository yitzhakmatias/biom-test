"use client"
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    TablePagination,
    tableCellClasses
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {BiomRow} from "@/app/Interfaces/BioRow";
import useSWR from 'swr';
import {useState} from "react";

const fetcher = (url: any) => fetch(url).then((res) => res.json());
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
const BiomTable = () => {
    const {data, error} = useSWR<{ data: BiomRow[] }>('/api/staticdata', fetcher);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Handle the error state
    if (error) return <div>Failed to load</div>;

    // If data is not yet available, you can show a loading indicator
    if (!data) return <div>Loading...</div>;
    const handleChangePage = (event:any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    if (data) {

        return (
            <Paper >
                <Table >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Tax ID</StyledTableCell>
                            <StyledTableCell>Abundance Score</StyledTableCell>
                            <StyledTableCell>Relative Abundance</StyledTableCell>
                            <StyledTableCell>Unique Matches Frequency</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <StyledTableRow  key={index}>
                                <StyledTableCell>{row.Metadata.Title}</StyledTableCell>
                                <StyledTableCell>{row.TaxID}</StyledTableCell>
                                <StyledTableCell>{row.AbundanceScore}</StyledTableCell>
                                <StyledTableCell>{row.RelativeAbundance}</StyledTableCell>
                                <StyledTableCell>{row.UniqueMatchesFrequency}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        );
    }

};

export default BiomTable;
