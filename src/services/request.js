export default async promise => {
	try {
		const res = await promise;
		return res.status === 200 ? res.data : null;
	} catch (e) {
		console.warn(e);
		return null;
	}
}