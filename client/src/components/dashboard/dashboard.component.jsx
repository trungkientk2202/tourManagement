import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme, styled } from '@mui/material/styles';
import { VerticalBarChart } from './components/chart/vertical-bar-chart.component';
import { PieChart } from './components/chart/pie-chart.component';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&`]: {
        verticalAlign: 'baseline',
        paddingTop: 0,
        paddingBottom: 0,
        borderBottom: 'unset'
    },
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        [`th&`]: {
            fontWeight: 'bold'
        }
    }
}));

function createData(name, parameter, divider) {
    return { name, parameter, divider };
}

const rows = [
    createData('Total Analyzed', '252'),
    createData('Speed limit (Km/h)', '40(2w)/ 40(Auto)/ 60(4w)/ 60(hv)'),
    createData('No of Violations', '2'),
    createData('% of Violations', '0.71%', true),
    createData('Average Speed', '26.40 km/h')
];

const Dashboard = () => {
    const theme = useTheme();

    return (
        <div>
            <Accordion sx={{ p: 5, pt: 2, pb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Stack direction={'row'} alignItems={'center'}>
                        <SearchIcon sx={{ fontSize: '1.5rem', mr: 2 }} />
                        <Typography sx={{ fontSize: '0.975rem', fontWeight: 'bold' }}>Search</Typography>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
                        amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Paper sx={{ p: 5, mt: 5 }}>
                <Box sx={{ pb: 3, borderBottom: `2px solid ${theme.palette.primary.main}` }}>
                    <Typography component={'h2'} sx={{ textAlign: 'center', fontSize: '1.25rem', fontWeight: 'bold' }}>
                        Smart Dashboard for ITMS (Speed Detection)
                    </Typography>
                    <Typography component={'p'} sx={{ textAlign: 'center' }}>
                        Duration: <strong>28/04/22 10:3038 AM</strong> to <strong>28/04/33 11:30:38 AM</strong>
                    </Typography>
                </Box>
                <Box sx={{ mt: 5 }}>
                    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                        <Box gridColumn="span 4">
                            <Item>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography
                                        component={'h4'}
                                        sx={{
                                            fontSize: '1rem',
                                            fontWeight: 'bold',
                                            color: theme.palette.primary.dark
                                        }}>
                                        Vehicle Statistics
                                    </Typography>
                                    <TableContainer component={Box} sx={{ padding: '16px 0' }}>
                                        <Table sx={{ maxWidth: '85%', margin: 'auto' }} size={'small'} aria-label="">
                                            <TableBody>
                                                {rows.map((row) => (
                                                    <TableRow
                                                        key={row.name}
                                                        sx={{
                                                            '&:last-child td, &:last-child th': { border: 0 },
                                                            ...(row?.divider && {
                                                                '& .MuiTableCell-root': {
                                                                    paddingBottom: 4
                                                                }
                                                            })
                                                        }}>
                                                        <StyledTableCell
                                                            component="th"
                                                            scope="row"
                                                            align="right"
                                                            width={'50%'}>
                                                            {row.name}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="left" width={'50%'}>
                                                            {row.parameter}
                                                        </StyledTableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Item>
                        </Box>
                        <Box gridColumn="span 8" gridRow="span 2">
                            <Item sx={{ height: '100%' }}>
                                <VerticalBarChart />
                            </Item>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </div>
    );
};

export default Dashboard;
