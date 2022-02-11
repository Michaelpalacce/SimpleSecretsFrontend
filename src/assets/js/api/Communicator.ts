import axios, { AxiosResponse }	from "axios";
import SimpleSecrets from "@/store/interfaces/simpleSecret";

const URL	= 'https://simplesecrets.stefangenov.site'

export default class Communicator {
	/**
	 * @brief	Gets secrets for a specific namespace
	 *
	 * @param	{String} namespace
	 */
	async getSecretsForNamespace( namespace: string ): Promise<AxiosResponse<SimpleSecrets[]>> {
		const response	= await axios.get( `${URL}/api/simplesecrets/${namespace}` ).catch( ( error ) => {
			return error;
		});

		if ( response.message )
			throw response;

		return response;
	}

	/**
	 * @brief	Gets all secrets
	 */
	async getAllSecrets(): Promise<AxiosResponse<SimpleSecrets[]>> {
		const response	= await axios.get( `${URL}/api/simplesecrets` ).catch( ( error ) => {
			return error;
		});

		if ( response.message )
			throw response;

		return response;
	}

	/**
	 * @brief	Gets a sepcific secret
	 */
	async getSecret( namespace: string, name: string ): Promise<AxiosResponse<SimpleSecrets>> {
		const response	= await axios.get( `${URL}/api/simplesecrets/${namespace}/${name}` ).catch( ( error ) => {
			return error;
		});

		if ( response.message )
			throw response;

		return response;
	}
}
