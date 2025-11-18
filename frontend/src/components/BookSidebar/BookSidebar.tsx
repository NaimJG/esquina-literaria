import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { List, ListItem, ListItemButton, ListItemIcon, Checkbox, ListItemText } from '@mui/material';
import type { BookFilter } from '../../types/Book';

interface BookSidebarProps {
    title: keyof BookFilter;
    displayName: string;
    items: string[];
    selectedItems: string[];
    onFilterChange: (category: keyof BookFilter, value: string) => void;
}

function BookSidebar({ title, displayName, items, selectedItems, onFilterChange }: BookSidebarProps) {

    const handleToggle = (value: string) => () => {
        onFilterChange(title, value);
    };

    return (
        <>
            <Accordion disableGutters 
                sx={{
                    borderRadius: '5px',
                    backgroundColor: 'transparent',
                    '&:before': {
                        display: 'none',
                    },
                    boxShadow: '0px 0px 4px 1px #0006'
                }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{
                        minHeight: '48px',
                        '&.Mui-expanded': {
                            minHeight: '48px',
                        },
                        '& .MuiAccordionSummary-content.Mui-expanded': {
                            margin: 0,
                        },
                    }}
                >
                    <Typography sx={{fontSize: '14px', fontWeight: '500', fontFamily: 'Poppins'}} component="span">{displayName}</Typography>
                </AccordionSummary>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'transparent' }}>
                    {items.map((value) => {
                        const labelId = `checkbox-list-label-${value}`;

                        return (
                            <ListItem
                                key={value}
                                disablePadding
                            >
                                <ListItemButton sx={{ padding: '0 20px' }} role={undefined} onClick={handleToggle(value)} dense>
                                    <ListItemIcon sx={{minWidth:'0'}}>
                                        <Checkbox
                                            edge="start"
                                            checked={selectedItems.includes(value)}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={value} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Accordion>
        </>
    )
}

export default BookSidebar