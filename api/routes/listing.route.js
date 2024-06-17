import express from 'express';
import { createListing, getListings, getListingById } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', createListing);
router.get('/get', getListings);
router.get('/:id', getListingById); // New route for fetching a single listing by ID

export default router;
