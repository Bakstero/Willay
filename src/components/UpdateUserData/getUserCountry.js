import React, { useState } from 'react';
import { CountryDropdown, RegionDropdown} from 'react-country-region-selector';
import { firestore, firebaseAuth } from '../Firebase/firebase'

export default function GetUserCountry() {
	const [startcountry, setStartcountry] = useState(null);
	const [startRegion, setStartRegion] = useState(null);

	const SetUserCountry = () => {
		const user = firebaseAuth().currentUser.uid
		firestore().collection('users').doc(user).set({ country: startcountry, region: startRegion }, { merge: true })
	}

		return (
			<form onSubmit={SetUserCountry}>
				<CountryDropdown
					value={startcountry}
					onChange={setStartcountry} />
				<RegionDropdown
					country={startcountry}
					value={startRegion}
					onChange={setStartRegion} />
					<button>Submit</button>
			</form>
		);
}