
import { GoHomeFill } from "react-icons/go"
import { nanoid } from 'nanoid'

import { FaHistory } from "react-icons/fa"
export const links =
    [{
        key: nanoid(),
        title: 'Home',
        links: [
            {
                name: 'Home',
                path : '/summarize',
                icon:<GoHomeFill className="me-3 mb-1 fs-5" />
            },
            {
                name: 'History',
                path : '/history',
                icon: <FaHistory className="me-3 mb-1 fs-5" />
            }
        ]
    },
  
    ]
